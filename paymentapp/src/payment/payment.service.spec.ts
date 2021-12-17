import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let mockService = {

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
});