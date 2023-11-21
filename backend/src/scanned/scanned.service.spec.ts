import { Test, TestingModule } from '@nestjs/testing';
import { ScannedService } from './scanned.service';

describe('ScannedService', () => {
  let service: ScannedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScannedService],
    }).compile();

    service = module.get<ScannedService>(ScannedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
