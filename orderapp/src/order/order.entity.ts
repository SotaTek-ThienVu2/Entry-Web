import { OrderStatus } from '../common/enum/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Order {
    /**ID */
    @PrimaryGeneratedColumn()
    id: number;

    /**order Number */
    @Column({length: 8, unique: true})
    orderNumber: string;

    /**order Number */
    @Column({length: 8})
    userID: string;

    /**name of produtc */
    @Column({length: 255})
    name: string;

    /**category */
    @Column({length: 255})
    category: string;

    /**image */
    @Column('text')
    image: string;

    /**address */
    @Column('text')
    address: string;

    /**description */
    @Column({length: 255})
    description: string;

    /**price */
    @Column()
    price: number;

    /**quantity */
    @Column()
    quantity: number;

    /**status */
    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.CREATED,
    })
    status: OrderStatus;

    /**created Date */
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createTimestamp: Date;
    
    /**modified date */
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updateTimestamp: Date;
}
