import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    ) {}
  /**
   * @returns All order
   */
  @Get()
  findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll()
  }
  /**
   * get order by order number
   * @param orderNumber 
   * @returns order
   */
  @Get(':orderNumber')
  findOne(@Param('orderNumber') orderNumber) {
    return this.orderService.findOne(orderNumber);
  }
  /**
   * create order
   * @param dto CreateOrderDto
   * @returns order
   */
  @Post()
  async create(@Body() dto: CreateOrderDto) {
    const order = await this.orderService.create(dto);
    
    if(!!order){
      this.orderService.pay(order);
    }
    return order;
  }
  /**
   * cancel order
   * @param orderNumber
   * @returns status code
   */
  @Put(':orderNumber/cancel')
  cancel(@Param('orderNumber') orderNumber) {
    this.orderService.cancel(orderNumber);
    return {status: true};
  }
  /**
   * confirm order
   * @param orderNumber 
   * @returns status code
   */
  @Put(':orderNumber/confirm')
  confirm(@Param('orderNumber') orderNumber) {
    this.orderService.confirm(orderNumber);
    return {status: true};
  }

}
