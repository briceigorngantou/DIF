import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CompanyModificationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  uuid: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  logo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sectorOfActivity: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;
}
