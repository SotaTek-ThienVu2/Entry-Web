import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderHistoryService } from '../order-history/order-history.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '../common/enum/Status';
import { OrderMockData, OrderListMockData, CreateOrderMockDto} from './mock/mockdata';
import { CreateOrderDto } from './dto/create-order.dto'
describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  let orderHistoryService: OrderHistoryService;

  const mockService = {
    findAll: jest.fn((userID: string) => OrderListMockData),
    findOne: jest.fn((id: number) => (OrderMockData)),
    create: jest.fn((CreateOrderMockDto, userID) => ({
      id: 10,
      ...CreateOrderMockDto,
      createTimestamp: new Date(),
      updateTimestamp: new Date(),
      status: Status.CREATED,
      orderNumber: "0i0J7UYO",
      userID: userID
    })),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [OrderController],
        providers: [OrderService,OrderHistoryService],
      })
      .overrideProvider(OrderService)
      .useValue(mockService)
      .overrideProvider(OrderHistoryService)
      .useValue({})
      .compile();
      orderController = moduleRef.get<OrderController>(OrderController);
      orderService = moduleRef.get<OrderService>(OrderService);
      orderHistoryService = moduleRef.get<OrderHistoryService>(OrderHistoryService);
  });

  it('should be defined', ()=>{
    expect(orderController).toBeDefined();
  });

  it(`should return all the orders of this user`, () => {
    const userID = "12";
    expect(orderController.findAll(userID)).toEqual(OrderListMockData);
  });

  it(`should get the order with id of order`, () => {
    const id = 9;
    expect(orderController.findOne(id)).toEqual(OrderMockData);
  });

  // it(`should create a new order and return the created order`, () => {
  //   return expect(
  //     orderController.create( "12", CreateOrderMockDto )
  //   ).resolves.toEqual({
  //     ...CreateOrderMockDto,
  //     id: expect.any(Number),
  //     status: expect.any(Status),
  //     orderNumber: expect.any(String),
  //     createTimestamp: expect.any(Date),
  //     updateTimestamp: expect.any(Date)
  //   });
  // });
});
