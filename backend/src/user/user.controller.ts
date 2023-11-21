import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from "@nestjs/common";
import { userService } from "./user.service";
import { userEntity } from "./entities/user.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Pagination } from "nestjs-typeorm-paginate";
import { Observable } from "rxjs";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("user")
export class userController {
  constructor(private readonly user: userService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  index(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Observable<Pagination<userEntity>> {
    return this.user.paginate({
      page,
      limit,
      route: "http://localhost:5000/user",
    });
  }

  @ApiBearerAuth()
  @Get(":id")
  async getUserById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<userEntity | {}> {
    return await this.user.getOneUserById(id);
  }

  @ApiBearerAuth()
  @Get("/uuid/:uuid")
  async getUserByUUId(@Param("uuid") uuid: number): Promise<userEntity | {}> {
    return await this.user.getOneUserByUUId(uuid);
  }

  @ApiBearerAuth()
  @Delete(":id")
  async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return await this.user.deleteUser(id);
  }
}
