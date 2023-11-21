import { FirebaseService } from "./upload-file/firebase/firebase.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CompanyModule } from "./company/company.module";
import { userModule } from "./user/user.module";
import { scannedModule } from "./scanned/scanned.module";
import { QrCodeModule } from "./qr-code/qr-code.module";
import { AuthModule } from "./auth/auth.module";
import { MailJetModule } from "./mail-jet/mail-jet.module";
import { UploadFileModule } from "./upload-file/upload-file.module";
import * as dotenv from "dotenv";

dotenv.config();
@Module({
  imports: [
    AuthModule,
    CompanyModule,
    userModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      migrationsRun: true,
      autoLoadEntities:true
    }),
    scannedModule,
    QrCodeModule,
    MailJetModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
