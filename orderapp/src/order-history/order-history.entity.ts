import { OrderStatus } from '../common/enum/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderHistory {
    @PrimaryGeneratedColumn()
    id: number;

    /**order Number */
    @Column({length: 8})
    orderNumber: string;

    /**status */
    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.CREATED,
    })
    status: string;

    /**createTimestamp */
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createTimestamp: Date;
}
