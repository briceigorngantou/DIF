import { Body, Controller, Post } from '@nestjs/common';
import { MailJetService } from './mail-jet.service';
import { CreateMailDto } from './../dto/CreateMail.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('mail-jet')
export class MailJetController {
  constructor(private readonly mail: MailJetService) {}

  @ApiBearerAuth()
  @Post()
  async save(@Body() email: CreateMailDto): Promise<any> {
    return await this.mail.sendMail(email);
  }
}
