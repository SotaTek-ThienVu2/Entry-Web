import { Controller, Body, Param, Get, Post, Put, Headers } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto, @Headers('Secret-key') key: string) {

    return this.paymentService.create(dto, key);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }
}
