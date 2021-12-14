import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum Status {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
}

@Entity()
export class PaymentEntity {
    /**ID */
    @PrimaryGeneratedColumn()
    id: number;
    /**orderId */
    @Column()
    orderId: number;
    /**Order number */
    @Column({length: 8, unique: true})
    orderNumber: string;
    @Column({length: 8})
    userID: string;
    /**name */
    @Column({length: 255})
    name: string;
    @Column({length: 255})
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
        default: Status.CONFIRMED,
    })
    status: Status;
    /**created date */
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createTimestamp: Date;
    /**modified date */
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updateTimestamp: Date;
}
