import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CodeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  code: number;
}
