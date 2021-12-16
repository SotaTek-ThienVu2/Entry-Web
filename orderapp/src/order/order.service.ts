import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity' 
import { Status } from '../common/enum/Status';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from  'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { OrderHistoryService } from '../order-history/order-history.service';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class OrderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly orderHistoryService: OrderHistoryService,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}
  /**Get all order by userID*/
  async findAll (userID :string): Promise<Order[]> {
    return await this.orderRepo
    .createQueryBuilder("order")
    .where("order.userID = :userID")
    .orderBy("order.id", "DESC")
    .setParameters({  userID: userID })
    .getMany();
  }
  /**Get 1 by id */
  async findOne (id): Promise<Order> {
    const order = await this.orderRepo.findOne({id})
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }
  /**create order */
  async create(dto: CreateOrderDto, userID: string): Promise<Order> {
    try {
      const order = new Order();
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
      await this.orderHistoryService.create(order.orderNumber, Status.CREATED);
      return await this.orderRepo.findOne(order.id);
    } catch (error) {
      return null;
    }
  }
  /**update */
  async update(order: Order): Promise<Order> {
    await this.orderRepo.update(order.id, order);
    return this.orderRepo.findOne(order.id)
  }
  /**cancel order
   * @param id 
   */
  async cancel(id: number): Promise<Order> {
    let order = await this.orderRepo.findOne({id});
    this.orderHistoryService.create(order.orderNumber, Status.CANCELLED);
    if(order.status === Status.CREATED || order.status === Status.CONFIRMED){
      await this.orderRepo.update(
          { id },
          { status: Status.CANCELLED, updateTimestamp: new Date() },
      );
    }
    return this.orderRepo.findOne({id})
  }
  /**confirm order */
  async confirm(id: number): Promise<Order> {
    let order = await this.orderRepo.findOne({id});
    this.orderHistoryService.create(order.orderNumber, Status.CONFIRMED);
    if (order.status === Status.CREATED) {
      await this.orderRepo.update(
          { id },
          { status: Status.CONFIRMED, updateTimestamp: new Date() },
      );
    }
    return this.orderRepo.findOne({id})
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
  async pay(order: Order, userID: string) {
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
    console.log(order);
    
    await this.httpService.post(paymentUrl , data, { headers: headersRequest })
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
        return res.data;
    })

}
}