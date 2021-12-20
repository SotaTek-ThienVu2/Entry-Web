import { OrderStatus } from '../common/enum/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 8, unique: true})
    orderNumber: string;
    @Column({length: 8})
    userID: string;
    @Column({length: 255})
    name: string;
    @Column({length: 255})
    category: string;
    @Column('text')
    image: string;
    @Column('text')
    address: string;
    @Column({length: 255})
    description: string;
    @Column()
    price: number;
    @Column()
    quantity: number;
    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.CREATED,
    })
    status: OrderStatus;
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createTimestamp: Date;
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updateTimestamp: Date;
}
