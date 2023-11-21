import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsBoolean, IsOptional } from "class-validator";

export class CreateQrCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idUser: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  uuid: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isScanned: boolean;
}
