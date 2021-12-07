import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PaymentEntity} from './payment.entity';
@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
    exports: [
        PaymentService,
    ],
})
export class PaymentModule {}
