import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,HttpStatus, Headers } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderHistoryService } from '../order-history/order-history.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOkResponse, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderHistoryService: OrderHistoryService,
    ) {}
  /**
   * @returns All order
   */
  @Get()
  @ApiOperation({ summary: 'Get all order' })
  @ApiOkResponse()
  findAll(@Headers('userID') userID: string): Promise<Order[]> {
    return this.orderService.findAll(userID)
  }
  /**
   * get order by order number
   * @param id 
   * @returns order
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiParam({name: 'id', required: true})
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id) {
    return this.orderService.findOne(id);
  }
  /**
   * get order detail by order number
   * @param orderNumber 
   * @returns order
   */
  @Get(':orderNumber/history')
  @ApiOperation({ summary: 'Get order detail by orderNumber' })
  @ApiParam({name: 'orderNumber', required: true})
  findHistory(@Param('orderNumber') orderNumber) {
    return this.orderHistoryService.findHistoryOrder(orderNumber);
  }
  /**
   * create order
   * @param dto CreateOrderDto
   * @returns order
   */
  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiBody({ type: CreateOrderDto, required: true, })
  async create(@Headers('userID') userID: string, @Body() dto: CreateOrderDto) {
    const order = await this.orderService.create(dto, userID);
    if(!!order){
      await this.orderService.pay(order, userID);
    }
    return order;
  }
  /**
   * cancel order
   * @param id
   * @returns status code
   */
  @Put(':id/cancel')
  @ApiOperation({ summary: 'Cancel order' })
  @ApiParam({name: 'id', required: true})
  async cancel(@Param('id',new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id) {
    return await this.orderService.cancel(id);;
  }
  /**
   * confirm order
   * @param id 
   * @returns status code
   */
  @Put(':id/confirm')
  @ApiOperation({ summary: 'Confirm order' })
  @ApiParam({name: 'id', required: true})
  async confirm(@Param('id',new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id) {
    return await this.orderService.confirm(id);
  }
}
