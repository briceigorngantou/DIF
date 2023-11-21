import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { QrCodeService } from 'src/qr-code/qr-code.service';
import { CreateQrCodeDto } from 'src/dto/CreateQrCode.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrcode: QrCodeService) {}

  @ApiBearerAuth()
  @Post('/save-visitor')
  async registerUserAndGetQrCode(@Body() newuser: CreateUserDto): Promise<any> {
    return await this.qrcode.getQRcode(newuser);
  }

  @ApiBearerAuth()
  @Post('/verify')
  async verifyQrCode(@Body() data: CreateQrCodeDto): Promise<any> {
    return await this.qrcode.VerifyQRCode(data);
  }

  @ApiBearerAuth()
  @Put(':uuid')
  async updateStatueQrCode(
    @Param('uuid', ParseIntPipe)
    id: number,
  ): Promise<any> {
    return await this.qrcode.updateStatusQrCode(id);
  }
}
