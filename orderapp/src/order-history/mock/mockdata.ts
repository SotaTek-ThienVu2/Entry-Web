import { OrderStatus } from '../../common/enum/status.enum';
export const OrderHistoryMockData = {
    id: 1,
    orderNumber: '5x5sjP3m',
    status: OrderStatus.CREATED,
    createTimestamp: new Date('2021-12-15T10:01:01.000Z'),
};

export const ListHistoryMockData = [
    {
        id: 3,
        orderNumber: 'yr6bM4FI',
        status: OrderStatus.CREATED,
        createTimestamp: new Date('2021-12-15T10:01:01.000Z'),
    },
    {
        id: 4,
        orderNumber: 'yr6bM4FI',
        status: OrderStatus.CONFIRMED,
        createTimestamp: new Date('2021-12-15T10:01:01.000Z'),
    },
    {
        id: 5,
        orderNumber: 'yr6bM4FI',
        status: OrderStatus.DELIVERED,
        createTimestamp: new Date('2021-12-15T10:01:01.000Z'),
    },
];
