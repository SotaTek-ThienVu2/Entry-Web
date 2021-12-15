import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Payment} from './payment.entity';
@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [TypeOrmModule.forFeature([Payment])],
    exports: [
        PaymentService,
    ],
})
export class PaymentModule {}
