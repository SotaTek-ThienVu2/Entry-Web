import { Injectable } from '@nestjs/common';
import { OrderEntity, Status } from './order.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository, createConnection, getRepository } from  'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    private configService: ConfigService
  ) {}
  /**Get all order */
  async findAll (): Promise<OrderEntity[]> {
    return await this.orderRepo.find();
  }
  /**Get 1 by id */
  async findOne (id): Promise<OrderEntity> {
    return await this.orderRepo.findOne({id})
  }
  /**create order */
  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    try {
      const order = new OrderEntity();
      order.name = dto.name;
      order.description = dto.description;
      order.price = dto.price;
      order.orderNumber = this.makeid(8);
      order.id = (await this.orderRepo.insert(order)).generatedMaps[0].id;
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
    return this.orderRepo.update(
        { id },
        { status: Status.CANCELLED, updateTimestamp: new Date() },
    );
  }
  /**confirm order */
  async confirm(id: number): Promise<UpdateResult> {
    return this.orderRepo.update(
        { id },
        { status: Status.CONFIRMED, updateTimestamp: new Date() },
    );
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
  pay(order: OrderEntity) {
    const delayTime = this.configService.get('X_SECOND');
    const self = this;
    const http = require('http');
    const data = JSON.stringify({
        name: order.name,
        description: order.description,
        price: order.price,
        orderNumber: order.orderNumber,
        orderId: order.id
    });

    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/payment',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
    };
    const req = http.request(options, (res) => {
        let responseString = '';

        res.on('data', (responseData) => {
            responseString += responseData;
        });
        res.on('end', () => {
            const responseJson = JSON.parse(responseString);
            if (responseJson.status === Status.CONFIRMED) {
                self.confirm(responseJson.orderId);
                setTimeout(() => {
                    self.orderRepo.update(
                        { id: responseJson.orderId },
                        { status: Status.DELIVERED, updateTimestamp: new Date() },
                    );

                }, delayTime);
            } else if(responseJson.status === Status.CANCELLED) {
                self.cancel(responseJson.orderId);
            }
            else{
              // 
            }
        });
    });
    req.write(data);
    req.end();
}
}