import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./../dto/CreateUser.dto";
import { Repository } from "typeorm";
import { userEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from "nestjs-typeorm-paginate";
import { Observable, from, map } from "rxjs";

@Injectable()
export class userService {
  constructor(
    @InjectRepository(userEntity)
    private userRepository: Repository<userEntity>
  ) {}

  paginate(option: IPaginationOptions): Observable<Pagination<userEntity>> {
    return from(paginate<userEntity>(this.userRepository, option)).pipe(
      map((userPageable: Pagination<userEntity>) => {
        userPageable.items;

        return userPageable;
      })
    );
  }

  async checkIfEmailUse(email: string) {
    try {
      const CheckIfEmailIsUseByUser = await this.userRepository.findOneBy({
        email: email,
      });

      if (CheckIfEmailIsUseByUser) {
        return true;
      } else return false;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async CreateUser(newUser: CreateUserDto): Promise<userEntity> {
    try {
      const checkIfEmailUseByUser = await this.checkIfEmailUse(newUser.email);

      if (!checkIfEmailUseByUser) {
        const result = await this.userRepository.save(newUser);
        return result;
      } else {
        throw new ConflictException("email already exist");
      }
    } catch (error) {
      throw new BadRequestException(
        "an error has occurred during registration",
        error
      );
    }
  }

  async getOneUserById(idUser: number): Promise<userEntity | {}> {
    try {
      const result = await this.userRepository.findOneById(idUser);
      if (result) return result;
      else throw new NotFoundException("user not found");
    } catch (error) {
      throw new NotFoundException("user not found");
    }
  }

  async deleteUser(id: number): Promise<any> {
    try {
      const result = await this.userRepository.findOneById(id);
      if (result) {
        await this.userRepository.delete(id);
        // await this.scannerService.deleteScannedCompany(idCompany);
        return {
          success: true,
          message: "Successfully delete user",
        };
      } else throw new NotFoundException("user not found");
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getOneUserByUUId(uuid: number): Promise<userEntity | {}> {
    try {
      const result = await this.userRepository.findOne({
        where: {
          uuid,
        },
      });
      if (result) return result;
      else throw new NotFoundException("user not found");
    } catch (error) {
      throw new NotFoundException("user not found");
    }
  }
}
