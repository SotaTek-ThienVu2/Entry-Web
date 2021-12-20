import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from '../common/enum/status.enum';
import { Repository, InsertResult, getRepository } from 'typeorm';
import { OrderHistory } from './order-history.entity';
@Injectable()
export class OrderHistoryService {
    constructor(
        @InjectRepository(OrderHistory)
        private readonly orderHistoryRepository: Repository<OrderHistory>,
    ) { }

    create(orderNumber: string, status: OrderStatus): Promise<InsertResult> {
        return this.orderHistoryRepository.insert({
            status,
            orderNumber,
            createTimestamp: new Date()
        });
    }

    async findHistoryOrder(orderNumber): Promise<OrderHistory[]> {
        return await this.orderHistoryRepository.find({ orderNumber })
    }
}
