import { Injectable } from '@nestjs/common';
import { AuthenticatedUserModel } from '../../model/authenticated-user.model';

import * as log4js from 'log4js';
const logger = log4js.getLogger('AuthService');

@Injectable()
export class AuthService 
{

    async login(credentials: { username: string; password: string }): Promise<AuthenticatedUserModel>
    {
        const user = new AuthenticatedUserModel();
        user.firstname='fake firstname';
        user.lastname='fake lastname';
        logger.warn('returning fake user !', user);
        return user;
    }
}
