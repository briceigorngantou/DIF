import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateScannedDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idCompany: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  uuid: number;
}
