import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([OrderEntity])],
})
export class OrderModule {}
