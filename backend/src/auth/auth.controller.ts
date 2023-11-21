import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateAuthDto } from './../dto/CreateAuth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private log: AuthService) {}

  @ApiBearerAuth()
  @Post('/login')
  async login(@Body() data: CreateAuthDto): Promise<any> {
    return await this.log.login(data);
  }

  @ApiBearerAuth()
  @Post('/register')
  async register(@Body() data: CreateAuthDto): Promise<any> {
    return await this.log.register(data);
  }
}
