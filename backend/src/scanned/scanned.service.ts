import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ScannedEntity } from "./entities/scanned.entity";
import { CreateScannedDto } from "./../dto/CreateScanned.dto";
import { CompanyService } from "./../company/company.service";
import { userService } from "../user/user.service";

@Injectable()
export class ScannedService {
  constructor(
    @InjectRepository(ScannedEntity)
    private scannedRepository: Repository<ScannedEntity>,
    private readonly companyService: CompanyService,
    private readonly userService: userService
  ) {}

  async Scanned(newScanned: CreateScannedDto): Promise<any> {
    try {
      const isExist = await this.userService.getOneUserByUUId(newScanned.uuid);
      if (isExist) {
        const IsScanned = await this.scannedRepository.findOneBy({
          uuid: newScanned.uuid,
          idCompany: newScanned.idCompany,
        });
        if (!IsScanned) {
          const result = await this.scannedRepository.save(newScanned);
          await this.companyService.updateCountVisitor(result.idCompany);
          return { success: true, message: "Successfully scanned" };
        } else {
          return { success: false, message: "User already scanned" };
        }
      }
    } catch (error) {
      throw new BadRequestException("something went  wrong");
    }
  }

  async deleteScannedCompany(id: number): Promise<any> {
    try {
      // const result = await this.scannedRepository.find({ idCompany: id });
      // if (result) {
      //   await this.scannedRepository.delete(result.idCompany);
      //   return {
      //     success: true,
      //     message: "Successfully delete",
      //   };
      // } else throw new NotFoundException();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
