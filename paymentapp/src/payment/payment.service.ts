import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Payment } from './payment.entity';
import { Status } from '../common/Status';
import { CreatePaymentDto } from './dto/create-payment.dto';
@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
    ) {}
    /**
     * 
     * @returns all payment
     */
    async findAll(): Promise<Payment[]> {
        return await this.paymentRepository.find();
    }
    /**
     * 
     * @param dto paymentdto
     * @returns payment
     */
    async create(dto: CreatePaymentDto, key: string): Promise<Payment> {
        if(key === Status.CONFIRMED){
            return await this.paymentRepository.findOneOrFail({ orderNumber: dto.orderNumber }).then((payment) => {
                return payment;
            }, function() {
                dto.status = Status.CONFIRMED;
                this.paymentRepository.insert(dto);
                return dto;
            }.bind(this));
        }else{
            return await this.paymentRepository.findOneOrFail({ orderNumber: dto.orderNumber }).then((payment) => {
                return payment;
            }, function() {
                dto.status = Status.CANCELLED;
                this.paymentRepository.insert(dto);
                return dto;
            }.bind(this));
        }
    }
}
