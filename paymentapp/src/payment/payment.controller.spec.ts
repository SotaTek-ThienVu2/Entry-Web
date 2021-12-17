import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CreatePaymentDto} from './dto/create-payment.dto';
import { PaymentMockData} from './mock/mockdata';
import { ConfigService } from '@nestjs/config';
import { Status } from '../common/Status';
describe('Payment Controller', () => {
  let controller: PaymentController;
  let service : PaymentService;
  let configService: ConfigService;
  const mockService = {
    create: jest.fn().mockResolvedValue((dto: CreatePaymentDto, key: string)=> {
      if(key === configService.get('SECRET_KEY')){
        Promise.resolve(
          {
            ...dto,
            id: 1
          }
        )
      }
    })
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService]
    })
    .overrideProvider(PaymentService)
    .useValue(mockService)
    .compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list payment', () => {
    const dto :CreatePaymentDto ={
      orderId: 1,
      orderNumber: "gdJgkt9D",
      userID: "12",
      name: "Tai nghe airport",
      category: "Công nghệ",
      image: "https://cdn.tgdd.vn/Products/Images/54/236016/bluetooth-airpods-2-apple-mv7n2-imei-1-org.jpg",
      address: "Hà há ha",
      description: "kkk",
      price: 20000,
      quantity: 2,
      status: Status.CONFIRMED,
      createTimestamp: new Date("2021-12-17T11:34:35.000Z"),
      updateTimestamp: new Date("2021-12-17T11:34:35.000Z")
    }
    expect(service.create( dto, 'SOTATEK')).resolves.toEqual(PaymentMockData);
  });

});