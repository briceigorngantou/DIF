import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateMailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  emailDestination: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
