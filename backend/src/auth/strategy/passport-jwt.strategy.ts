import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { PayloadInterface } from './payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './../../auth/entities/auth.entity';
import { Repository } from 'typeorm';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthEntity)
    private auth: Repository<AuthEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: PayloadInterface) {
    const user = await this.auth.findOneBy({ username: payload.email });

    if (user) {
      const { password, salt, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }
}
