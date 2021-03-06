import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import { OrderHistoryService } from '../order-history/order-history.service';
import { OrderStatus } from '../common/enum/status.enum';
@Injectable()
export class OrderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly orderHistoryService: OrderHistoryService,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) { }
  /**Get all order by userID*/
  async findAll(userID: string): Promise<Order[]> {
    return await this.orderRepo
      .createQueryBuilder('order')
      .where('order.userID = :userID')
      .orderBy('order.id', 'DESC')
      .setParameters({ userID: userID })
      .getMany();
  }
  /**Get 1 by id */
  async findOne(id): Promise<Order> {
    const order = await this.orderRepo.findOne({ id });
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
      // add history created
      const inserted = await this.orderHistoryService.create(
        order.orderNumber,
        OrderStatus.CREATED,
      );
      const newOrder = await this.orderRepo.findOne(order.id);
      return newOrder;
    } catch (error) {
      return null;
    }
  }
  /**update */
  async update(order: Order): Promise<Order> {
    await this.orderRepo.update(order.id, order);
    return this.orderRepo.findOne(order.id);
  }
  /**cancel order
   * @param id
   */
  async cancel(id: number): Promise<Order> {
    let order = await this.orderRepo.findOne({ id });
    //add history canceled
    this.orderHistoryService.create(order.orderNumber, OrderStatus.CANCELLED);
    if (
      order.status === OrderStatus.CREATED ||
      order.status === OrderStatus.CONFIRMED
    ) {
      await this.orderRepo.update(
        { id },
        { status: OrderStatus.CANCELLED, updateTimestamp: new Date() },
      );
    }
    return this.orderRepo.findOne({ id });
  }
  /**confirm order */
  async confirm(id: number): Promise<Order> {
    let order = await this.orderRepo.findOne({ id });
    //add history confirmed
    this.orderHistoryService.create(order.orderNumber, OrderStatus.CONFIRMED);
    if (order.status === OrderStatus.CREATED) {
      await this.orderRepo.update(
        { id },
        { status: OrderStatus.CONFIRMED, updateTimestamp: new Date() },
      );
    }
    return this.orderRepo.findOne({ id });
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
  makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**call api pay from paymentapp */
  async pay(order: Order, userID: string) {
    const self = this;
    const http = require('http');
    const data = new TextEncoder().encode(
      JSON.stringify({
        name: order.name,
        description: order.description,
        price: order.price,
        orderNumber: order.orderNumber,
        orderId: order.id,
        address: order.address,
        quantity: order.quantity,
        image: order.image,
        category: order.category,
        userID: userID,
      }))

    const delayTime = this.configService.get('X_SECOND');
    const paymentHost = this.configService.get('PAYMENT_HOST');
    const secretK = this.configService.get('SECRET_KEY');
    const options = {
      hostname: paymentHost,
      port: 8002,
      path: '/payment',
      method: 'POST',
      headers: {
        'DUMMY-PIN': secretK,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
      },
    };
    const req = await http.request(options, (res) => {
      let responseString = '';
      res.on('data', (responseData) => {
        responseString += responseData;
      });
      req.on('error', (error) => {
        throw new Error(error);
      });
      res.on('end', () => {
        if (responseString) {
          const responseJson = JSON.parse(responseString);
          if (responseJson.status === OrderStatus.CONFIRMED) {
            self.confirm(responseJson.orderId);
            setTimeout(() => {
              self.orderRepo.update(
                { id: responseJson.orderId },
                { status: OrderStatus.DELIVERED, updateTimestamp: new Date() },
              );
              this.orderHistoryService.create(
                responseJson.orderNumber,
                OrderStatus.DELIVERED,
              );
            }, delayTime);
          } else {
            self.cancel(responseJson.orderId);
          }
        }
      });
    });
    req.write(data);
    req.end();
  }
}
