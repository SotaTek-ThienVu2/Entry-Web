import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, getRepository } from 'typeorm';
import { OrderHistory } from './order-history.entity';
import { Status } from 'src/common/enum/Status';
@Injectable()
export class OrderHistoryService {
    constructor(
        @InjectRepository(OrderHistory)
        private readonly orderHistoryRepository: Repository<OrderHistory>,
    ) {}

    create(orderNumber: string, status: Status): Promise<InsertResult> {
        return this.orderHistoryRepository.insert({
            status,
            orderNumber,
            createTimestamp : new Date()
        });
    }

    async findByOrderNumber (orderNumber): Promise<OrderHistory[]> {
        return await this.orderHistoryRepository.find({orderNumber})
    }
}
