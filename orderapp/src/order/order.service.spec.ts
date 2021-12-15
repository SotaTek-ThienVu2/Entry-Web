import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderHistory } from '../order-history/order-history.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderHistoryService } from '../order-history/order-history.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Order } from './order.entity';

describe('OrderService', () => {
  let service: OrderService;
  let orderHistoryService: OrderHistoryService;

  const mockOrderHistoryService = null;
  const mockOrderRepository = null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        ConfigService,
        HttpService,
        OrderHistoryService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    })
      .overrideProvider(OrderHistoryService)
      .useValue({})
      .overrideProvider(HttpService)
      .useValue({})
      .compile();

    service = module.get<OrderService>(OrderService);
    orderHistoryService = module.get<OrderHistoryService>(OrderHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
