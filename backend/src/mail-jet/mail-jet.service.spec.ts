import { Test, TestingModule } from '@nestjs/testing';
import { MailJetService } from './mail-jet.service';

describe('MailJetService', () => {
  let service: MailJetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailJetService],
    }).compile();

    service = module.get<MailJetService>(MailJetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
