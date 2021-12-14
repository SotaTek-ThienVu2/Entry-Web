import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderHistoryService } from './order-history.service';
import { OrderEntity } from './order.entity';
import { Test } from '@nestjs/testing';
describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  let orderHistoryService: OrderHistoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [OrderController],
        providers: [OrderService,OrderHistoryService ],
      }).compile();
      orderService = moduleRef.get<OrderService>(OrderService);
      orderHistoryService = moduleRef.get<OrderHistoryService>(OrderHistoryService);
      orderController = moduleRef.get<OrderController>(OrderController);
  });

  describe('findAll', () => {
    it('should return list of order', async (done) => {
        const userID = "12";
        let result = orderService.findAll(userID);
        result
          .then(rslt => expect(rslt).toBe('foo'))
          .then(done);
    //   const result =  ;
    //   const userID = "12";
    //   jest.spyOn(orderService, 'findAll').mockImplementation(() => result);

    //   expect(await orderController.findAll(userID)).toBe(result);
    });
  });
});