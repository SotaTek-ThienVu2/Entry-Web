import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Status } from '../common/status';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly configService: ConfigService,
    ) { }
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
        if (key === secretK) {
            const existedPaymet = await this.paymentRepository.findOne(dto.orderNumber);
            if (!existedPaymet) {
                if (Math.floor(Math.random() * 2) == 0) {
                    dto.status = Status.CONFIRMED;
                }
                else {
                    dto.status = Status.CANCELLED;
                }
                await this.paymentRepository.insert(dto);
                const paymentResult = await this.paymentRepository.findOne({
                    where: { orderNumber: dto.orderNumber }
                });
                return paymentResult;
            }
            else {
                return await this.paymentRepository.findOne({
                    where: { orderNumber: dto.orderNumber }
                });
            }
        } else {
            return await this.paymentRepository.findOne({
                where: { orderNumber: dto.orderNumber }
            });
        }
    }
}
