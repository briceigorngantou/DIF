import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "../dto/CreateCompany.dto";
import { CompanyEntity } from "./entities/company.entity";
import { Pagination } from "nestjs-typeorm-paginate";
import { async, Observable } from "rxjs";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { CodeDto } from "../dto/CodeDto.dto";
import { CompanyModificationDto } from "../dto/companyModificationDto.dto";

@Controller("company")
export class CompanyController {
  constructor(private readonly company: CompanyService) {}

  @ApiBearerAuth()
  @Get("/uuid/")
  async getCompanyByUuid(@Query("uuid") uuid: string): Promise<CompanyEntity> {
    return await this.company.getOneCompanyByUuid(uuid);
  }

  @ApiBearerAuth()
  @Get("/token")
  async getToken(@Query("min") min: number, @Query("max") max: number) {
    return this.company.getRndTokenAccess(min, max);
  }

  @ApiBearerAuth()
  @Get("/all-sector-of-activity")
  async getAllSectorOfActivity(): Promise<string[]> {
    return await this.company.getAllSectorOfActivity();
  }

  @ApiBearerAuth()
  @Get("/all-address")
  async getAllAdress(): Promise<string[]> {
    return await this.company.getAllAdress();
  }

  @ApiBearerAuth()
  @Get(":id")
  async getCompanyById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<CompanyEntity> {
    return await this.company.getOneCompanyById(id);
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: "address",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: "sector",
    required: false,
    type: String,
  })
  @Get()
  index(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("address") address?: string,
    @Query("sector") sector?: string
  ): Observable<Pagination<CompanyEntity>> {
    return this.company.paginate(
      {
        page,
        limit,
        // route: "http://localhost:5000/company",
      },
      {
        address,
        sector,
      }
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async createCompany(
    @Body() newCompany: CreateCompanyDto
  ): Promise<CompanyEntity> {
    return await this.company.CreateCompany(newCompany);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(":id")
  async deleteCompany(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return await this.company.deleteCompany(id);
  }

  @ApiBearerAuth()
  @Post("/verify")
  async verifyCompany(@Body() code: CodeDto): Promise<any> {
    return await this.company.verifyToken(code);
  }

  @ApiBearerAuth()
  @Get("/contact/:id_Company")
  async getContact(@Param("id_Company", ParseIntPipe) id_Company: number) {
    return await this.company.getContact(id_Company);
  }

  @ApiBearerAuth()
  @Put("/edit/:id_company")
  async updateStatueQrCode(
    @Param("id_company", ParseIntPipe)
    id: number,
    @Body() newData: CompanyModificationDto
  ): Promise<any> {
    return await this.company.updateCompany(id, newData);
  }

  @ApiBearerAuth()
  @Put("/edit/updateNumber_Visitor/:id_company")
  async updateNumVisitor(
    @Param("id_company", ParseIntPipe)
    id: number,
    @Query("value") value: number
  ): Promise<any> {
    return await this.company.updateNumberVisitor(id, value);
  }

  @ApiBearerAuth()
  @Put("/edit/updateNumber_Contact/:id_company")
  async updateNumContact(
    @Param("id_company", ParseIntPipe)
    id: number,
    @Query("value") value: number
  ): Promise<any> {
    return await this.company.updateNumberContact(id, value);
  }
}
