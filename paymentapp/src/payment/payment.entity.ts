import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../common/status';
@Entity()
export class Payment {
    /**ID */
    @PrimaryGeneratedColumn()
    id: number;
    /**orderId */
    @Column()
    orderId: number;
    /**Order number */
    @Column({ length: 8, unique: true })
    orderNumber: string;
    @Column({ length: 8 })
    userID: string;
    /**name */
    @Column({ length: 255 })
    name: string;
    @Column({ length: 255 })
    category: string;
    @Column('text')
    image: string;
    @Column('text')
    address: string;
    /**description */
    @Column('text')
    description: string;
    /**price */
    @Column()
    price: number;
    @Column()
    quantity: number;
    /**status */
    @Column({
        type: 'enum',
        enum: Status,
    })
    status: Status;
    /**created date */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTimestamp: Date;
    /**modified date */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateTimestamp: Date;
}
