import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../common/status';
@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    orderId: number;
    @Column({name: 'orderNumber', length: 8, unique: true })
    orderNumber: string;
    @Column({ length: 8 })
    userID: string;
    @Column({ length: 255 })
    name: string;
    @Column({ length: 255 })
    category: string;
    @Column('text')
    image: string;
    @Column('text')
    address: string;
    @Column('text')
    description: string;
    @Column()
    price: number;
    @Column()
    quantity: number;
    @Column({
        type: 'enum',
        enum: Status,
    })
    status: Status;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTimestamp: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateTimestamp: Date;
}
