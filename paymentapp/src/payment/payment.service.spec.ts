import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PaymentMockData, PaymentListMockData} from './mock/mockdata';
import { CreatePaymentDto} from './dto/create-payment.dto';
import { Status } from '../common/Status';

describe('PaymentService', () => {
  let service: PaymentService;
  let mockService = {
    findAll: jest.fn().mockImplementation(() => PaymentListMockData),
    create: jest.fn().mockImplementation((dto: CreatePaymentDto, key: string)=> PaymentMockData)

  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    })
    .overrideProvider(PaymentService)
    .useValue(mockService)
    .compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should get all payment`, async () => {
    expect(await mockService.findAll()).toEqual(PaymentListMockData);
  });

  it('should return new payment', async () => {
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
    expect( await mockService.create( dto, 'SOTATEK')).toEqual(PaymentMockData);
  });
});