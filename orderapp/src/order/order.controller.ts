import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiBody, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger';
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    ) {}
  /**
   * @returns All order
   */
  @Get()
  @ApiOperation({ summary: 'Get all order' })
  @ApiOkResponse()
  findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll()
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
   * create order
   * @param dto CreateOrderDto
   * @returns order
   */
  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiBody({ type: CreateOrderDto, required: true, })
  async create(@Body() dto: CreateOrderDto) {
    const order = await this.orderService.create(dto);
    
    if(!!order){
      this.orderService.pay(order);
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
    let cancelResult = await  this.orderService.cancel(id);
    return cancelResult.affected;
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
    let confirmResult = await this.orderService.confirm(id);
    return confirmResult.affected;
  }

}
