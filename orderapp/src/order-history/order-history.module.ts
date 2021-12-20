import { Module } from '@nestjs/common';
import { OrderHistoryService } from './order-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistory } from './order-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHistory])],
  providers: [OrderHistoryService],
  exports: [OrderHistoryService, TypeOrmModule],
})
export class OrderHistoryModule { }