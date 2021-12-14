import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderEntity, Status } from './order.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository, createConnection, getRepository } from  'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { OrderHistoryService } from './order-history.service';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    private configService: ConfigService,
    private httpService: HttpService,
    private readonly orderHistoryService: OrderHistoryService,
  ) {}
  /**Get all order */
  async findAll (userID :string): Promise<OrderEntity[]> {
    return await this.orderRepo.
    createQueryBuilder("order")
    .where("order.userID = :userID")
    .orderBy("order.id", "DESC")
    .setParameters({  userID: userID })
    .getMany();
  }
  /**Get 1 by id */
  async findOne (id): Promise<OrderEntity> {
    return await this.orderRepo.findOne({id})
  }
  /**create order */
  async create(dto: CreateOrderDto, userID: string): Promise<OrderEntity> {
    try {
      const order = new OrderEntity();
      order.name = dto.name;
      order.description = dto.description;
      order.price = dto.price;
      order.address = dto.address;
      order.quantity = dto.quantity;
      order.category = dto.category;
      order.image = dto.image;
      order.userID = userID;
      order.createTimestamp = new Date();
      order.orderNumber = this.makeid(8);
      order.id = (await this.orderRepo.insert(order)).generatedMaps[0].id;
      this.orderHistoryService.create(order.orderNumber, Status.CREATED);
      return order;
    } catch (error) {
      return null;
    }
  }
  /**update */
  async update(order: OrderEntity): Promise<UpdateResult> {
    return await this.orderRepo.update(order.id, order);
  }
  /**cancel order
   * @param id 
   */
  async cancel(id: number): Promise<UpdateResult> {
    let order = await this.orderRepo.findOne({id});
    this.orderHistoryService.create(order.orderNumber, Status.CANCELLED);
    if(order.status === Status.CREATED || order.status === Status.CONFIRMED){
      return this.orderRepo.update(
          { id },
          { status: Status.CANCELLED, updateTimestamp: new Date() },
      );
    }else{
      let rs = new UpdateResult;
      rs.affected = 0;
      return rs;
    }
  }
  /**confirm order */
  async confirm(id: number): Promise<UpdateResult> {
    let order = await this.orderRepo.findOne({id});
    this.orderHistoryService.create(order.orderNumber, Status.CONFIRMED);
    if (order.status === Status.CREATED) {
      return this.orderRepo.update(
          { id },
          { status: Status.CONFIRMED, updateTimestamp: new Date() },
      );
    }else{
      let rs = new UpdateResult;
      rs.affected = 0;
      return rs;
    }
  }
  /**
   * delete (may be use)
   * @param id 
   * @returns 
   */
  async delete(id): Promise<DeleteResult> {
    return await this.orderRepo.delete(id);
  } 
  
  /**generate random code */
  makeid(length){
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    return result;
  }
  /**call payment and handle */
  pay(order: OrderEntity, userID: string) {
    const delayTime = this.configService.get('X_SECOND');
    const paymentUrl = this.configService.get('PAYMENT_URL');
    const headersRequest = {
        'Secret-key': Math.floor(Math.random() * 2) == 0 ? Status.CONFIRMED : Status.CANCELLED,
    };
    const self = this;
    const data = {
        name: order.name,
        description: order.description,
        price: order.price,
        orderNumber: order.orderNumber,
        orderId: order.id,
        address: order.address,
        quantity: order.quantity,
        image: order.image,
        category: order.category,
        userID: userID
    };
    this.httpService.post(paymentUrl , data, { headers: headersRequest })
    .pipe(
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
      tap(response => {
        if(!response.data){self.delete(data.orderId)}
      })
    )
    .subscribe(
      res => {
        let data = res.data;
        if (data.status === Status.CONFIRMED) {
            self.confirm(data.orderId);
            setTimeout(() => {
                self.orderRepo.update(
                    { id: data.orderId },
                    { status: Status.DELIVERED, updateTimestamp: new Date() },
                );
                this.orderHistoryService.create(order.orderNumber, Status.DELIVERED);
            }, delayTime);
        } else if(data.status === Status.CANCELLED) {
            self.cancel(data.orderId);
        }
    })

}
}