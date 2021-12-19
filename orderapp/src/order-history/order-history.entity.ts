import { OrderStatus } from '../common/enum/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 8})
    orderNumber: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.CREATED,
    })
    status: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createTimestamp: Date;
}
