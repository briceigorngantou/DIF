import { Module } from '@nestjs/common';
import { MailJetController } from './mail-jet.controller';
import { MailJetService } from './mail-jet.service';

@Module({
  controllers: [MailJetController],
  providers: [MailJetService],
  exports: [MailJetService],
})
export class MailJetModule {}
