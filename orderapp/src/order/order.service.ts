import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from  'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { OrderHistoryService } from '../order-history/order-history.service';
import { catchError, tap } from 'rxjs/operators';
import { OrderStatus } from '../common/enum/status.enum';
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
      const insertResult = await this.orderRepo.insert(order);
      order.id = insertResult.generatedMaps[0].id;
      var inserted = await this.orderHistoryService.create(order.orderNumber, OrderStatus.CREATED);
      const newOrder = await this.orderRepo.findOne(order.id);;
      return newOrder;
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
    this.orderHistoryService.create(order.orderNumber, OrderStatus.CANCELLED);
    if(order.status === OrderStatus.CREATED || order.status === OrderStatus.CONFIRMED){
      await this.orderRepo.update(
          { id },
          { status: OrderStatus.CANCELLED, updateTimestamp: new Date() },
      );
    }
    return this.orderRepo.findOne({id})
  }
  /**confirm order */
  async confirm(id: number): Promise<Order> {
    let order = await this.orderRepo.findOne({id});
    this.orderHistoryService.create(order.orderNumber, OrderStatus.CONFIRMED);
    if (order.status === OrderStatus.CREATED) {
      await this.orderRepo.update(
          { id },
          { status: OrderStatus.CONFIRMED, updateTimestamp: new Date() },
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

  async pay(order: Order, userID: string) {
    const self = this;
    const http = require('http');
    const data = JSON.stringify({
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
    });
    const options = {
        hostname: 'payment',
        port: 8002,
        path: '/payment',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Secret-key': Math.floor(Math.random() * 2) == 0 ? OrderStatus.CONFIRMED : OrderStatus.CANCELLED,
        },
    };
    const req = await http.request(options, (res) => {
        let responseString = '';
        res.on('data', (responseData) => {
            responseString += responseData;
        });
        res.on('end', () => {
            const responseJson = JSON.parse(responseString);
            if (responseJson.status === OrderStatus.CONFIRMED) {
                self.confirm(responseJson.orderId);
                setTimeout(() => {
                    self.orderRepo.update(
                    { id: responseJson.orderId },
                    { status: OrderStatus.DELIVERED, updateTimestamp: new Date() },
                );
                this.orderHistoryService.create(responseJson.orderNumber, OrderStatus.DELIVERED);
                }, 5000);
            } else {
                self.cancel(responseJson.orderId);
            }
        });
    });

    req.write(data);
    req.end();
}
}