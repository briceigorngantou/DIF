import { AuthModule } from './../auth/auth.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { userController } from './user.controller';
import { userService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
import { userMiddleware } from 'src/middelwares/user.middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.SECRET_KET,
      signOptions: {
        expiresIn: 86400,
      },
    }),
    AuthModule,
  ],
  controllers: [userController],
  providers: [userService],
  exports: [userService],
})
export class userModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(userMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
