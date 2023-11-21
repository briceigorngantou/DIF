
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from "@nestjs/common";
import { CompanyController } from "./company.controller";
import { CompanyMiddleware } from "../middelwares/company.middleware";
import { CompanyEntity } from "./entities/company.entity";
import { CompanyService } from "./company.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MailJetModule } from "../mail-jet/mail-jet.module";
import * as dotenv from "dotenv";
import { AuthModule } from "../auth/auth.module";
import { userModule } from "../user/user.module";

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.register({
      secret: process.env.SECRET_KET,
      signOptions: {
        expiresIn: 86400,
      },
    }),
    MailJetModule,
    AuthModule,
    userModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CompanyMiddleware)
      .forRoutes(
        { path: "company", method: RequestMethod.GET },
        { path: "company*", method: RequestMethod.GET },
        { path: "company*", method: RequestMethod.DELETE },
        { path: "company", method: RequestMethod.POST }
      );
  }
}
