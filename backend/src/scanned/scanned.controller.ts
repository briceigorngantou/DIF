import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateScannedDto } from './../dto/CreateScanned.dto';
import { ScannedService } from './scanned.service';

@Controller('scanned')
export class ScannedController {
  constructor(private readonly scanned: ScannedService) {}

  @ApiBearerAuth()
  @Post()
  async saveScanned(@Body() newscanned: CreateScannedDto): Promise<any> {
    return await this.scanned.Scanned(newscanned);
  }
}
