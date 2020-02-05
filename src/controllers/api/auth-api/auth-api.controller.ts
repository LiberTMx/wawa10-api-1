import { Controller, Request, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';

import * as log4js from 'log4js';
const logger = log4js.getLogger('AuthApiController');

@Controller('auth')
export class AuthApiController 
{
    constructor(
        private readonly authService: AuthService,
      ) 
    {}

  @Post('login')
  async login(@Request() req): Promise<any> 
  {
    const body = req.body;

    if (!body) throw new HttpException('Body is missing', HttpStatus.BAD_REQUEST);
    if (!body.username || !body.password) throw new HttpException('Missing username or password', HttpStatus.BAD_REQUEST);

    return await this.authService.login(body);
  }
}
