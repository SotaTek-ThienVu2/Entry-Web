import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PaymentEntity, Status } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
        private configService: ConfigService,
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
    async create(dto: CreatePaymentDto, key: string): Promise<PaymentEntity> {
        if(key === this.configService.get('SECRET_KEY_PAYMENT')){
            return await this.paymentRepository.findOneOrFail({ orderNumber: dto.orderNumber }).then((payment) => {
                return payment;
            }, function() {
                const payment = new PaymentEntity();
                payment.name = dto.name;
                payment.description = dto.description;
                payment.price = dto.price;
                payment.orderNumber = dto.orderNumber;
                payment.orderId = dto.orderId;
                //random result
                payment.status = Math.floor(Math.random() * 2) == 0 ? Status.CONFIRMED : Status.CANCELLED;
                this.paymentRepository.insert(payment);
                return payment;
            }.bind(this));
        }else{
            return null
        }
    }
}
