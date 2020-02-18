import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as log4js from 'log4js';
import { AuthService } from '../../modules/auth/services/auth/auth.service';
import { AuthUserEntity } from '../../modules/repository/user/entities/auth-user.entity';

const logger = log4js.getLogger('RolesGuard');

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
              private readonly authService: AuthService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const data = context.switchToWs().getData();
    const authHeader = data.req.headers.authorization;
    const user: AuthUserEntity = await this.authService.identifyUser(authHeader);
    const hasRole = false;
    if (user) {
      logger.warn('Check next line !');
        //$$ hasRole = user.authUserGroup.authGroup.authGroupRole.some(ag => roles.includes(ag.authRoleName.name));
    }
    return user && hasRole;
  }
}
