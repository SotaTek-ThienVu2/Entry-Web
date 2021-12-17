import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Payment } from './payment.entity';
import { Status } from '../common/Status';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly configService: ConfigService,
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
        const secretK = this.configService.get('SECRET_KEY');
        if(key === secretK){
            return await this.paymentRepository.findOneOrFail({ orderNumber: dto.orderNumber }).then((payment) => {
                return payment;
            }, function() {
                if(Math.floor(Math.random() * 2) == 0){
                    dto.status = Status.CONFIRMED;
                }
                else{
                    dto.status = Status.CANCELLED;
                }
                this.paymentRepository.insert(dto);
                return this.paymentRepository.findOne(dto.orderNumber);
            }.bind(this));
        }else{
            return null;
        }
    }
}
