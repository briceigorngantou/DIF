import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { QrCodeEntity } from "./entities/qr-code.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./../dto/CreateUser.dto";
import { userService } from "./../user/user.service";
import { MailJetService } from "./../mail-jet/mail-jet.service";
import { CreateQrCodeDto } from "./../dto/CreateQrCode.dto";
import { CreateMailDto } from "src/dto/CreateMail.dto";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class QrCodeService {
  constructor(
    @InjectRepository(QrCodeEntity)
    private qrCodeRepository: Repository<QrCodeEntity>,
    private readonly user: userService,
    private readonly mailJet: MailJetService
  ) {}

  async VerifyQRCode(data: CreateQrCodeDto): Promise<any> {
    let res = false;
    try {
      const result = await this.qrCodeRepository.findBy({
        idUser: data.idUser,
        uuid: data.uuid,
      });
      if (result.length != 0) {
        res = true;
      }
      return {
        success: res,
      };
    } catch (error) {
      throw new Error("someting was wrong" + error);
    }
  }

  async getById(id: number): Promise<QrCodeEntity> {
    try {
      return await this.qrCodeRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateStatusQrCode(uuid: number): Promise<any> {
    try {
      const data = await this.qrCodeRepository.findOneBy({
        uuid: uuid,
      });
      const newData = new CreateQrCodeDto();
      newData.uuid = data.uuid;
      newData.isScanned = true;
      await this.qrCodeRepository.update(uuid, newData);
      return {
        success: true,
        message: "Successfully scanned qrcode",
      };
    } catch (error) {}
  }

  async saveQrCode(data: CreateQrCodeDto): Promise<any> {
    try {
      return await this.qrCodeRepository.save(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getQRcode(data: CreateUserDto): Promise<any> {
    const dataqr = new CreateQrCodeDto();
    const email = new CreateMailDto();
    try {
      const result_user = await this.user.CreateUser(data);
      console.log(result_user);
      dataqr.idUser = result_user.idUser;
      dataqr.uuid = result_user.uuid;
      dataqr.isScanned = false;
      const result = await this.qrCodeRepository.findOneById(dataqr.idUser);
      if (!result) {
        const res = await this.saveQrCode(dataqr);
        if (res) {
          email.emailDestination = data.email;
          email.message =
            "Print your access tikect in this link " +
            result_user.urlRedirection;
          await this.mailJet.sendMail(email);
          return {
            success: true,
            message: "Successfully registration",
            data: result_user,
          };
        } else throw new ConflictException("This user already have qrCode");
      }
    } catch (error) {
      throw new ConflictException("user already exist");
    }
  }
}
