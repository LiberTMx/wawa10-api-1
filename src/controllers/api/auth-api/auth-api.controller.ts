import { Controller, Request, Post, HttpException, HttpStatus, Body, Headers, BadRequestException, Get, Query, Param } from '@nestjs/common';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';

import * as log4js from 'log4js';
import { CreateUserDTO } from '../../../shared/dto/create-user.dto';
import { AuthUserEntity } from '../../../modules/repository/user/entities/auth-user.entity';
import { validateSync } from 'class-validator';
import { AuthDomainModel } from '../../../modules/repository/user/model/auth-domain.model';
import { AuthGroupModel } from '../../../modules/repository/user/model/auth-group.model';
import { AuthFonctionEntity } from '../../../modules/repository/user/entities/auth-fonction.entity';
import { AuthFonctionModel } from '../../../modules/repository/user/model/auth-fonction.model';
import { AuthDomainEntity } from '../../../modules/repository/user/entities/auth-domain.entity';
import { AuthRoleEntity } from '../../../modules/repository/user/entities/auth-role.entity';
import { AuthGroupRoleEntity } from '../../../modules/repository/user/entities/auth-group-role.entity';
import { AuthGroupEntity } from '../../../modules/repository/user/entities/auth-group.entity';
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

  /*
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

    const u: AuthUserEntity = await this.authService.existsUsername(createUserDTO.username);
    if (u) {
      throw new BadRequestException('User data validation: username already exists');
    }

    const newUser: AuthUserEntity = await this.authService.createUser(createUserDTO);
    // await this.authService.addUserGroup(newUser, group);
    return newUser;
  }
  */

  @Post('changePassword')
  async changePassword(@Request() req): Promise<any> 
  {
    const body = req.body;

    if (!body) throw new HttpException('Body is missing', HttpStatus.BAD_REQUEST);
    if (!body.username || !body.password || !body.jeton) throw new HttpException('Missing username, password or jeton', HttpStatus.BAD_REQUEST);

    return await this.authService.changePassword(body);
  }

  @Get('domainList')
  async getAllAuthDomains(@Request() req): Promise<AuthDomainEntity[]>
  {
    return await this.authService.getAllAuthDomains();
  }

  @Get('roleList')
  async getAllAuthRoles(@Request() req): Promise<AuthRoleEntity[]>
  {
    return await this.authService.getAllAuthRoles();
  }

  @Post('domainCreate')
  async createDomain(@Request() req, @Body() authDomainModel: AuthDomainModel)
  {
    logger.debug('Creating a new auth domain:', authDomainModel);

    const validationErrors = validateSync(authDomainModel, { validationError: { target: false } });
    if (validationErrors !== null && validationErrors.length > 0) 
    {
      throw new BadRequestException(validationErrors);
    }
    return await this.authService.createAuthDomain(authDomainModel);
  }

  @Get('groupList')
  async getAllAuthGroups(@Request() req)
  {
    return await this.authService.getAllAuthGroups();
  }

  @Get('groupRoleList')
  async getAllAuthGroupRoles(@Request() req): Promise<AuthGroupRoleEntity[]>
  {
    return await this.authService.getAllAuthGroupRoles();
  }

  @Post('groupCreate')
  async createGroup(@Request() req, @Body() authGroupModel: AuthGroupModel)
  {
    logger.debug('Creating a new auth group:', authGroupModel);

    const validationErrors = validateSync(authGroupModel, { validationError: { target: false } });
    if (validationErrors !== null && validationErrors.length > 0) 
    {
      throw new BadRequestException(validationErrors);
    }
    return await this.authService.createAuthGroup(authGroupModel);
  }

  @Get('liste')
  async getUserList(@Query() query): Promise<AuthUserEntity[]>
  {
      const readAll = query.readAll;
      const all: boolean = (readAll!==null && readAll!==undefined && (readAll==='1' || readAll==='true') );
      logger.debug('user list - readAll:', all);
      const users=await this.authService.getUserList(all);
      if(users!==null && users!==undefined && users.length>0)
      {
        // remove password !
        for(const u of users)
        {
          u.password=null;
        }
      }
      return users;
  }

  @Get('userById/:id')
  async getUserById(@Param() params): Promise<AuthUserEntity>
  {
      const userId = params.id;
      logger.debug('user by id:', userId);
      const user=await this.authService.getUserById(userId);
      
      if(user!==null && user!==undefined)
      {
        // remove password !
        user.password=null;
      }
      return user;
  }

  @Get('fonctions')
  async getAllUserFonction(): Promise<AuthFonctionEntity[]>
  {
    return await this.authService.getAllUserFonction();    
  }

  @Post('createFonction')
  async createFonction(@Body() fonction: AuthFonctionModel): Promise<AuthFonctionEntity>
  {
    logger.debug('Creating a new fonction:', fonction);

    const validationErrors = validateSync(fonction, { validationError: { target: false } });
    if (validationErrors !== null && validationErrors.length > 0) 
    {
      throw new BadRequestException(validationErrors);
    }
    return await this.authService.createAuthFonction(fonction);
  }

  @Post('updateFonction')
  async updateFonction(): Promise<AuthFonctionEntity>
  {
    throw new BadRequestException('Still NOT implemented !');
  }

  @Post('deleteFonction/:id')
  async deleteFonction(): Promise<AuthFonctionEntity>
  {
    throw new BadRequestException('Still NOT implemented !');
  } 

  @Post('createUser')
  async createUser(@Request() req, @Headers() headers): Promise<AuthUserEntity>
  {
    const user: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
    if (user === null) {
      throw new BadRequestException('Unauthorized access');
    }
    logger.debug('Current user is:', user.username);
    const body=req.body;
/*     logger.debug('Create a user', body.userFormValue );
    logger.debug('Create a user', body.assignedFonctions );
    logger.debug('Create a user', body.assignedRoles ); */
    //throw new BadRequestException('Still NOT implemented !');
    try
    {
      return await this.authService.createUserByForm(body.userFormValue, body.assignedFonctions, body.assignedRoles);
    }
    catch(err)
    {
      throw new BadRequestException(err.message);
    }
  }

  @Get('groups/:id')
  async getGroupsForUser(@Param() params): Promise<AuthGroupEntity[]>
  {
    const userId = params.id;
    try
    {
      return await this.authService.getGroupsForUser(userId);
    }
    catch(err)
    {
      throw new BadRequestException(err.message);
    }
  }

  @Post('updateUser')
  async updateUser(@Request() req, @Headers() headers): Promise<AuthUserEntity>
  {
    const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
    if (connectedUser === null) {
      throw new BadRequestException('Unauthorized access');
    }
    logger.debug('Current user is:', connectedUser.username, connectedUser.id);

    const body=req.body;
    logger.debug('Update a user', body.userFormValue );

    try
    {
      return await this.authService.updateUserByForm(body.userFormValue, body.assignedFonctions, body.assignedRoles);
    }
    catch(err)
    {
      logger.error(err);
      throw new BadRequestException(err.message);
    }
  }
}
