import { Test, TestingModule } from '@nestjs/testing';
import { LorawanService } from './lorawan.service';

describe('LorawanService', () => {
  let service: LorawanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LorawanService],
    }).compile();

    service = module.get<LorawanService>(LorawanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
