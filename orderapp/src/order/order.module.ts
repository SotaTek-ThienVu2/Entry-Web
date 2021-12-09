import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import {OrderHistoryService} from './order-history.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import {OrderHistory} from './order-history.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [OrderService, OrderHistoryService],
  controllers: [OrderController],
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderHistory]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    })
    
  ],
})
export class OrderModule {}
