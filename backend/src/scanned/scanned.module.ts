import { Module } from "@nestjs/common";
import { ScannedController } from "./scanned.controller";
import { ScannedService } from "./scanned.service";
import { ScannedEntity } from "src/scanned/entities/scanned.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyModule } from "./../company/company.module";
import { userModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ScannedEntity]),
    CompanyModule,
    userModule,
  ],
  controllers: [ScannedController],
  providers: [ScannedService],
})
export class scannedModule {}
