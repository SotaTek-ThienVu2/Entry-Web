import { Test, TestingModule } from '@nestjs/testing';
import { OrderHistoryService } from '../order-history/order-history.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { OrderHistoryMockData, ListHistoryMockData } from './mock/mockdata';
import { OrderStatus } from '../common/enum/status.enum';
import { HttpStatus, HttpException } from '@nestjs/common';
describe('OrderService', () => {
    let orderHistoryService: OrderHistoryService;
    let httpService: HttpService;
    let mockOrderHistoryService = {
        insert: jest
            .fn()
            .mockResolvedValue((status: OrderStatus, orderNumber: string) => {
                Promise.resolve({
                    id: 1,
                    orderNumber: '5x5sjP3m',
                    status: OrderStatus.CREATED,
                    createTimestamp: new Date('2021-12-15T10:01:01.000Z'),
                });
            }),
        find: jest.fn().mockResolvedValue((orderID: string) => {
            Promise.resolve(ListHistoryMockData);
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConfigService, HttpService, OrderHistoryService],
        })
            .overrideProvider(OrderHistoryService)
            .useValue({})
            .overrideProvider(HttpService)
            .useValue({})
            .compile();
        orderHistoryService = module.get<OrderHistoryService>(OrderHistoryService);
        httpService = module.get(HttpService);
    });

    it('should be defined', () => {
        expect(orderHistoryService).toBeDefined();
    });

    it(`create an order with it's status`, async () => {
        (mockOrderHistoryService.insert = jest.fn().mockResolvedValue({
            id: 1,
            orderNumber: '5x5sjP3m',
            status: OrderStatus.CREATED,
            createTimestamp: new Date('2021-12-15T10:01:01.000Z'),
        })),
        expect(
            await mockOrderHistoryService.insert('5x5sjP3m', OrderStatus.CREATED),
        ).toEqual(OrderHistoryMockData);
        try {
            const a = orderHistoryService.create('5x5sjP3m', OrderStatus.CREATED);
            expect(a).toEqual(OrderHistoryMockData);
        } catch (err) {
            new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    });

    it(`should get the list order history`, async () => {
        try {
            const a = orderHistoryService.findHistoryOrder('5x5sjP3m');
            expect(a).toEqual(ListHistoryMockData);
        } catch (err) {
            new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    });
});
