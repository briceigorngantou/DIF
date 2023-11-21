import { Test, TestingModule } from '@nestjs/testing';
import { MailJetController } from './mail-jet.controller';

describe('MailJetController', () => {
  let controller: MailJetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailJetController],
    }).compile();

    controller = module.get<MailJetController>(MailJetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
