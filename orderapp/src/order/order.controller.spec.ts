import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderHistoryService } from '../order-history/order-history.service';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatus } from '../common/enum/status.enum';
import { OrderMockData, OrderListMockData, CreateOrderMockDto} from './mock/mockdata';
import { Order } from './order.entity';
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
      createTimestamp: "2021-12-15T12:11:05.107Z",
      updateTimestamp: "2021-12-15T12:11:05.107Z",
      status: OrderStatus.CREATED,
      orderNumber: "0i0J7UYO",
      userID: userID
    })),
    pay: jest.fn(( order = OrderMockData, userID: string) => {}),
    cancel: jest.fn((id: number) => (OrderMockData)),
    confirm: jest.fn((id: number) => (OrderMockData)),
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

  it(`should create a new order and return the created order`, async () => {
    await mockService.create(CreateOrderMockDto, "12")
    await mockService.pay(OrderMockData , "12")
    expect(orderController.create( "12", CreateOrderMockDto)).resolves.toEqual({
      address: "Hà Nội",
      category: "thời trang nam",
      createTimestamp: "2021-12-15T12:11:05.107Z",
      description: "Hàng dởm",
      id: 10,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      name: "Bánh xe",
      orderNumber: "0i0J7UYO",
      price: 109.5,
      quantity: 1,
      status: OrderStatus.CREATED,
      updateTimestamp: "2021-12-15T12:11:05.107Z",
      userID: "12"
    });
  });

  it(`should get the order if cancelled`, () => {
    const id = 9;
    expect(orderController.cancel(id)).resolves.toEqual(OrderMockData);
  });

  it(`should get the order if confirmed`, () => {
    const id = 9;
    expect(orderController.confirm(id)).resolves.toEqual(OrderMockData);
  });
});
