import { Status } from 'src/common/enum/Status';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 8})
    orderNumber: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.CREATED,
    })
    status: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createTimestamp: Date;
}
