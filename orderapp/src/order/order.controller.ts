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
   * @param id 
   * @returns order
   */
  @Get(':id')
  findOne(@Param('id') id) {
    return this.orderService.findOne(id);
  }
  /**
   * create order
   * @param dto CreateOrderDto
   * @returns order
   */
  @Post()
  create(@Body() dto: CreateOrderDto) {
    const order = this.orderService.create(dto);
    if(!!order){
      this.orderService.pay(order);
    }
    return order;
  }
  /**
   * cancel order
   * @param id id number
   * @returns status code
   */
  @Put(':id/cancel')
  cancel(@Param('id') id) {
    this.orderService.cancel(id);
    return {status: true};
  }
  /**
   * confirm order
   * @param id 
   * @returns status code
   */
  @Put(':id/confirm')
  confirm(@Param('id') id) {
    this.orderService.confirm(id);
    return {status: true};
  }

}
