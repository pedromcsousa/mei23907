import { Test, TestingModule } from '@nestjs/testing';
import { LorawanController } from './lorawan.controller';

describe('LorawanController', () => {
  let controller: LorawanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LorawanController],
    }).compile();

    controller = module.get<LorawanController>(LorawanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
