import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('authentification...');
    const authorization = req.header;
    if (!authorization) {
      return res
        .status(403)
        .send({ error: 'No Authentification Token Provided' });
    }
    next();
  }
}
