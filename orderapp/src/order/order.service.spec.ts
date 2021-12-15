import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderHistory } from '../order-history/order-history.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderHistoryService } from '../order-history/order-history.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Order } from './order.entity';
import { OrderMockData, OrderListMockData, CreateOrderMockDto} from './mock/mockdata';
import { Status } from '../common/enum/Status';
describe('OrderService', () => {
  let service: OrderService;
  let orderHistoryService: OrderHistoryService;

  const mockOrderHistoryService = {
    insert: jest.fn().mockImplementation((status: Status, orderNumber: string)=>{
      Promise.resolve({
        id: 9,
        orderNumber: "5x5sjP3m",
        status: Status.CREATED,
        createTimestamp: "2021-12-15T10:01:01.000Z"
      })
    })
  };
  const mockOrderRepository = {
    findAll: jest.fn().mockImplementation((userID: string) =>
      Promise.resolve(OrderListMockData),
    ),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      setParameters: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnThis(),
    })),
    findOne: jest.fn().mockImplementation((id = 9) =>
      Promise.resolve(OrderMockData),
    ),
    makeid: jest.fn().mockImplementation((number = 8) =>
      "5x5sjP3m"
    ),
    insert: jest.fn().mockImplementation((order: Order )=> {
      generatedMaps: [
        {
          id: 9
        }
      ]
    })
  };

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

  it(`should get all the orders of userID and return them successfully`, async () => {
    const userID = "12"
    await service.findAll(userID);
    expect(mockOrderRepository.createQueryBuilder).toHaveBeenCalled();
  });

  it(`should get the order that has ID equal 9`, async () => {
    expect(await service.findOne(9)).toEqual(OrderMockData);
  });

  // it(`should get the created order`, async () => {
  //   await mockOrderRepository.insert(OrderMockData)
  //   await mockOrderHistoryService.insert({
  //     id: 9,
  //     orderNumber: "5x5sjP3m",
  //     status: Status.CREATED,
  //     createTimestamp: "2021-12-15T10:01:01.000Z"})
  //   expect( service.create( CreateOrderMockDto , "12")).resolves.toEqual(OrderMockData);
  //   expect( service.create( CreateOrderMockDto , "12")).rejects.toBeCalled();
  // });
});
