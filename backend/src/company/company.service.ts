import { userService } from "./../user/user.service";
import { AuthService } from "./../auth/auth.service";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCompanyDto } from "../dto/CreateCompany.dto";
import { CompanyEntity } from "./entities/company.entity";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MailJetService } from "./../mail-jet/mail-jet.service";
import { CreateMailDto } from "./../dto/CreateMail.dto";
import * as dotenv from "dotenv";
import { Observable, from, map } from "rxjs";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from "nestjs-typeorm-paginate";
import { CodeDto } from "../dto/CodeDto.dto";
import { CompanyModificationDto } from "src/dto/companyModificationDto.dto";
dotenv.config();

interface FilterTypes {
  sector?: string;
  address?: string;
}

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private mailJet: MailJetService
  ) {}

  paginate(
    option: IPaginationOptions,
    filterTypes?: FilterTypes
  ): Observable<Pagination<CompanyEntity>> {
    const filters:
      | FindOptionsWhere<CompanyEntity>
      | FindManyOptions<CompanyEntity> = {
      where: {
        address: filterTypes?.address,
        sectorOfActivity: filterTypes?.sector,
      },
      order: {
        token: "DESC",
      },
    };

    return from(
      paginate<CompanyEntity>(
        this.companyRepository,
        option,
        filterTypes.address && filters
      )
    ).pipe(
      map((userPageable: Pagination<CompanyEntity>) => {
        userPageable.items.forEach(function (v) {
          delete v.token;
        });
        return userPageable;
      })
    );
  }

  async deleteCompany(idCompany: number): Promise<any> {
    try {
      const result = await this.companyRepository.findOneById(idCompany);
      if (result) {
        await this.companyRepository.delete(idCompany);
        // await this.scannerService.deleteScannedCompany(idCompany);
        return {
          success: true,
          message: "Successfully delete company",
        };
      } else throw new NotFoundException("company not found");
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getOneCompanyById(id: number): Promise<any> {
    const result = await this.companyRepository.findOneById(id);
    if (result) {
      const { token, ...data } = result;
      return data;
    }
    throw new NotFoundException("Company not found");
  }

  async getOneCompanyByUuid(uuid: string): Promise<any> {
    const result = await this.companyRepository.findOneBy({ uuid: uuid });

    if (result) {
      const { token, ...data } = result;
      return data;
    }
    throw new NotFoundException("Company not found");
  }

  getRndTokenAccess(min: number, max: number): number {
    const a = Math.ceil(min);
    const b = Math.floor(max);
    const result = Math.floor(Math.random() * (b - a)) + a;
    return result;
  }

  async CreateCompany(newCompany: CreateCompanyDto): Promise<any> {
    const email = new CreateMailDto();
    const tokenCompany = this.getRndTokenAccess(1000, 10000);
    try {
      const CheckIfEmailIsUseByCompany = await this.CheckIfEmailIsUseByCompany(
        newCompany.email
      );

      const checkIfTokenAlreadyUse = await this.CheckIfTokenByCompany(
        tokenCompany
      );

      if (!CheckIfEmailIsUseByCompany && !checkIfTokenAlreadyUse) {
        const saveData = this.companyRepository.create({ ...newCompany });
        saveData.token = tokenCompany;

        email.emailDestination = saveData.email;
        email.message =
          "Your access token is  " +
          tokenCompany +
          "\n" +
          "Follow this link to log in " +
          newCompany.urlRedirection;

        const res = await this.companyRepository.save(saveData);

        await this.mailJet.sendMail(email);
        return {
          idCompany: res.idCompany,
          name: res.name,
          description: res.description,
          sectorOfActivity: res.sectorOfActivity,
          logo: res.logo,
        };
      } else throw new ConflictException("Sorry token or email already exist");
    } catch (error) {
      throw new ConflictException("Something went wrong");
    }
  }

  async updateCountVisitor(id_company: number): Promise<any> {
    try {
      const data = await this.getOneCompanyById(id_company);
      if (data) {
        data.numberVisitor = data.numberVisitor + 1;
        await this.companyRepository.update(id_company, data);
        return {
          success: true,
          message: "Successfully updated number of participants",
        };
      } else throw new NotFoundException("company not found");
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateCountContact(id_company: number): Promise<any> {
    try {
      const data = await this.getOneCompanyById(id_company);
      if (data) {
        data.numberContact = data.numberContact + 1;
        await this.companyRepository.update(id_company, data);
        return {
          success: true,
          message: "Successfully updated",
        };
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async verifyToken(code: CodeDto): Promise<any> {
    try {
      const result = await this.companyRepository.findOneBy({
        token: code.code,
      });
      if (result) {
        return {
          result: true,
          message: "authentificated",
          idCompany: result.idCompany,
        };
      } else throw new NotFoundException("incorrect token");
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getContact(idCompany: number): Promise<any> {
    try {
      const result = await this.companyRepository.findOneById(idCompany);
      if (result) {
        await this.updateCountContact(idCompany);
        return {
          email: result.email,
          address: result.address,
          phoneNumber: result.phoneNumber,
        };
      } else {
        throw new NotFoundException("company not found");
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async CheckIfEmailIsUseByCompany(email: string): Promise<Boolean> {
    try {
      const checkEmail = await this.companyRepository.findOneBy({
        email: email,
      });
      if (checkEmail) {
        return true;
      } else return false;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async CheckIfTokenByCompany(token: number): Promise<Boolean> {
    try {
      const checkToken = await this.companyRepository.findOneBy({
        token: token,
      });
      if (checkToken) {
        return true;
      } else return false;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getAllSectorOfActivity(): Promise<string[]> {
    try {
      const result = await this.companyRepository.query(
        "SELECT DISTINCT sectorOfActivity FROM `company` WHERE 1"
      );
      if (result) return result;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getAllAdress(): Promise<string[]> {
    try {
      const result = await this.companyRepository.query(
        "SELECT DISTINCT address FROM `company` WHERE 1 "
      );
      if (result) return result;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateCompany(
    id: number,
    newData: CompanyModificationDto
  ): Promise<any> {
    try {
      const data = await this.getOneCompanyById(id);
      if (data) {
        data.uuid = newData.uuid;
        data.name = newData.name;
        data.description = data.description;
        data.address = newData.address;
        data.logo = newData.logo;
        data.sectorOfActivity = newData.sectorOfActivity;
        data.email = newData.email;
        data.phoneNumber = newData.phoneNumber;
        await this.companyRepository.update(id, data);
        return {
          success: true,
          message: "Successfully updated",
        };
      } else throw new NotFoundException("company not found");
    } catch (error) {
      throw new NotFoundException("company not found");
    }
  }

  async updateNumberVisitor(idCompany: number, value: number) {
    try {
      const data = await this.getOneCompanyById(idCompany);
      if (data) {
        data.numberVisitor = value;
        await this.companyRepository.update(idCompany, data);
        return {
          success: true,
          message: "Successfully updated number of participants",
        };
      } else throw new NotFoundException("company not found");
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateNumberContact(idCompany: number, value: number) {
    try {
      const data = await this.getOneCompanyById(idCompany);
      if (data) {
        data.numberContact = value;
        await this.companyRepository.update(idCompany, data);
        return {
          success: true,
          message: "Successfully updated contact of participants",
        };
      } else throw new NotFoundException("company not found");
    } catch (error) {
      throw new BadRequestException();
    }
  }
}


