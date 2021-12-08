import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PaymentEntity, Status } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
    ) {}
    /**
     * 
     * @returns all payment
     */
    async findAll(): Promise<PaymentEntity[]> {
        return await this.paymentRepository.find();
    }
    /**
     * 
     * @param dto paymentdto
     * @returns payment
     */
    async create(dto: CreatePaymentDto): Promise<PaymentEntity> {
        /**if found return payment by ordernumber
         * else
         * insert new payment then return it
         */
        return await this.paymentRepository.findOneOrFail({ orderNumber: dto.orderNumber }).then((payment) => {
            return payment;
        }, function() {
            const payment = new PaymentEntity();
            payment.name = dto.name;
            payment.description = dto.description;
            payment.price = dto.price;
            payment.orderNumber = dto.orderNumber;
            //random result
            payment.status = Math.floor(Math.random() * 2) == 0 ? Status.CONFIRMED : Status.CANCELLED;
            this.paymentRepository.insert(payment);
            return payment;
        }.bind(this));
    }
}
