import { Test, TestingModule } from '@nestjs/testing';
import { ScannedController } from './scanned.controller';

describe('ScannedController', () => {
  let controller: ScannedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScannedController],
    }).compile();

    controller = module.get<ScannedController>(ScannedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
