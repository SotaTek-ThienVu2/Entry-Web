import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Payment } from './payment.entity';
import { Status } from 'src/common/Status';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private configService: ConfigService,
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
                const payment = new Payment();
                payment.name = dto.name;
                payment.description = dto.description;
                payment.price = dto.price;
                payment.orderNumber = dto.orderNumber;
                payment.orderId = dto.orderId;
                payment.category = dto.category;
                payment.image = dto.image;
                payment.quantity = dto.quantity;
                payment.address = dto.address;
                payment.status =  Status.CONFIRMED;
                payment.userID = dto.userID;
                payment.createTimestamp = new Date();
                payment.updateTimestamp = new Date();
                this.paymentRepository.insert(payment);
                return payment;
            }.bind(this));
        }else{
            return await this.paymentRepository.findOneOrFail({ orderNumber: dto.orderNumber }).then((payment) => {
                return payment;
            }, function() {
                const payment = new Payment();
                payment.name = dto.name;
                payment.description = dto.description;
                payment.price = dto.price;
                payment.orderNumber = dto.orderNumber;
                payment.orderId = dto.orderId;
                payment.category = dto.category;
                payment.image = dto.image;
                payment.quantity = dto.quantity;
                payment.address = dto.address;
                payment.status =  Status.CANCELLED;
                payment.userID = dto.userID;
                payment.createTimestamp = new Date();
                payment.updateTimestamp = new Date();
                this.paymentRepository.insert(payment);
                return payment;
            }.bind(this));
        }
    }
}
