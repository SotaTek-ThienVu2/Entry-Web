import { Controller, Body, Param, Get, Post, Put, Headers } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiForbiddenResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create payment' })
  @ApiBody({ type: CreatePaymentDto, required: true, })
  create(@Body() dto: CreatePaymentDto, @Headers('Secret-key') key: string) {
    return this.paymentService.create(dto, key);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payment' })
  @ApiOkResponse()
  findAll() {
    return this.paymentService.findAll();
  }
}
