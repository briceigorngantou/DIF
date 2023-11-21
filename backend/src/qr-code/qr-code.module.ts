import { CompanyModule } from './../company/company.module';
import { Module } from '@nestjs/common';
import { QrCodeController } from './qr-code.controller';
import { QrCodeEntity } from './entities/qr-code.entity';
import { QrCodeService } from './qr-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailJetModule } from './../mail-jet/mail-jet.module';
import { userModule } from './../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QrCodeEntity]),
    userModule,
    MailJetModule,
    CompanyModule,
  ],
  controllers: [QrCodeController],
  providers: [QrCodeService],
})
export class QrCodeModule {}
