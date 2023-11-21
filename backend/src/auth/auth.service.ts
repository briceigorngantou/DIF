import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from 'src/dto/CreateAuth.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string) {
    return await this.authRepository.findOneBy({
      username: email,
    });
  }

  async register(data: CreateAuthDto): Promise<any> {
    try {
      const newData = this.authRepository.create({
        ...data,
      });
      newData.salt = await bcrypt.genSalt();
      newData.password = await bcrypt.hash(newData.password, newData.salt);
      await this.authRepository.save(newData);
      return {
        success: true,
        message: 'registration successfully',
        access_token: this.jwtService.sign({
          authentificate: true,
          role: 'admin',
          username: newData.username,
        }),
      };
    } catch (error) {
      throw new ConflictException('user already exist');
    }
  }

  async checkIfEmailUse(email: string): Promise<Boolean> {
    try {
      const checkEmail = await this.authRepository.findOneBy({
        username: email,
      });
      if (checkEmail) return true;
      else return false;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async login(data: CreateAuthDto): Promise<any> {
    try {
      const result = await this.authRepository.findOneBy({
        username: data.username,
      });

      if (!result) {
        throw new NotFoundException('invalid username or password ');
      }
      const hashedPassword = await bcrypt.hash(data.password, result.salt);
      if (hashedPassword === result.password) {
        const payload = {
          authentificate: true,
          role: 'admin',
          username: result.username,
        };
        const jwt = this.jwtService.sign(payload);
        return {
          success: true,
          message: 'authentification successfully',
          access_token: jwt,
        };
      } else throw new NotFoundException('invalid username or password');
    } catch (error) {
      throw new NotFoundException('invalid username or password');
    }
  }
}
