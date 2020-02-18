import { Controller, Request, Post, HttpException, HttpStatus, Body, Headers, BadRequestException } from '@nestjs/common';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';

import * as log4js from 'log4js';
import { CreateUserDTO } from '../../../shared/dto/create-user.dto';
import { AuthUserEntity } from '../../../modules/repository/user/entities/auth-user.entity';
import { validateSync } from 'class-validator';
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

  @Post('/refresh-token')
  async refreshToken(@Request() req): Promise<any> {
    const body = req.body;

    return this.authService.refreshToken(body.refreshToken);
  }

  @Post('/createUser')
  async createUser(@Body() createUserDTO: CreateUserDTO, @Headers() headers): Promise<AuthUserEntity> {
    const user: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
    if (user === null) {
      throw new BadRequestException('Unauthorized access');
    }
    logger.debug('add user', createUserDTO);
    const validationErrors = validateSync(createUserDTO, { validationError: { target: false } });
    if (validationErrors !== null && validationErrors.length > 0 ) {
      logger.error('user add has errors!', validationErrors);
      throw new BadRequestException('User data validation error(s): ' + validationErrors);
    }

    // check group
    /*
    const group: AuthGroupEntity = await this.authUserService.findGroup(createUserDTO.group);
    if (!group) {
      throw new BadRequestException('User data validation: invalid group');
    }

    if (group.name === 'Editor' && group.name !== user.authUserGroup.authGroup.name) {
      throw new BadRequestException('Unauthorized - you must be an editor to create editor users !');
    }
    */

    const u: AuthUserEntity = await this.authService.existsUsername(createUserDTO.username);
    if (u) {
      throw new BadRequestException('User data validation: username already exists');
    }

    /*
    u = await this.authUserService.existsEmail(createUserDTO.email);
    if (u) {
      throw new BadRequestException('User data validation: email already exists');
    }
    */

    const newUser: AuthUserEntity = await this.authService.createUser(createUserDTO);
    // await this.authService.addUserGroup(newUser, group);
    return newUser;
  }

}
