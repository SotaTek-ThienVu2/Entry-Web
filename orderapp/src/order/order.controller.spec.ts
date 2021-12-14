import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service'
import { OrderHistoryService } from './order-history.service'
import { OrderEntity, Status } from './order.entity';
import {CreateOrderDto} from './dto/create-order.dto'
describe('Order Controller', () => {
    let controller: OrderController;
    let orderService: OrderService;
    let orderHistoryService : OrderHistoryService;

    beforeEach(async () => {
        const ApiServiceProvider = {
            provide: OrderService,
            useFactory: () => ({
                findAll: jest.fn(() => []),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [OrderService, ApiServiceProvider],
        }).compile();
        controller = app.get<OrderController>(OrderController);
        orderService = app.get<OrderService>(OrderService);
        orderHistoryService = app.get<OrderHistoryService>(OrderHistoryService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    /**findAll */
    describe('findAll', () => {
        it('should return an array of order', async () => {
            controller.findAll();
            expect(orderService.findAll()).toHaveBeenCalled();
        });
    });
    /**findOne */
    describe('findOne', () => {
        it('should return an array of order', async (id) => {
            const temp = new OrderEntity;
            temp.id = 1
            temp.orderNumber = "WtGb6Eqs"
            temp.name ="Bánh"
            temp.category = "Đồ ăn"
            temp.image = "https://cf.shopee.vn/file/09ca6f8e32962f7cda47d8020b7b7162"
            temp.address = "Hoàng Hoa Thám"
            temp.description = "Bánh hảo hảo"
            temp.price = 23000
            temp.quantity = 10
            temp.status = Status.CANCELLED
            temp.createTimestamp = new Date()
            temp.updateTimestamp = new Date()
            controller.findOne(id);
            expect(orderService.findOne(id)).toBe(temp);
        });
    });
    /**find detail history */
    describe('findDetail', () => {
        it('should return an array of order', async (orderNumber) => {
            controller.findDetail(orderNumber);
            expect(orderHistoryService.findByOrderNumber(orderNumber)).toHaveBeenCalled();
        });
    });
    /**create order */
    describe('create', () => {
        it('should return an array of order', async () => {
            const dtoTemp = {
                "name": "Bánh xe",
                "price": 109.5,
                "address": "Hà Nội",
                "quantity": 1,
                "description": "Hàng dởm",
                "category": "thời trang nam",
                "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            };
            controller.create(dtoTemp);
            expect(orderService.create(dtoTemp)).toHaveBeenCalled();
        });
    });
});