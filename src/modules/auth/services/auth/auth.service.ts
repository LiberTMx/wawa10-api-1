import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthenticatedUserModel } from '../../model/authenticated-user.model';

import * as crypto from 'crypto';
import * as log4js from 'log4js';
import { TokensModel } from '../../model/tokens.model';
import { JwtService, JWT_CONFIG } from '../jwt/jwt.service';
import { UserRepositoryService } from '../../../repository/user/services/user-repository/user-repository.service';
import { CreateUserDTO } from '../../../../shared/dto/create-user.dto';
import { AuthUserEntity } from '../../../repository/user/entities/auth-user.entity';

const logger = log4js.getLogger('AuthService');

@Injectable()
export class AuthService 
{

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepositoryService: UserRepositoryService,
    ) {}

    async login(credentials: { username: string; password: string }): Promise<AuthenticatedUserModel>
    {
        /*
        const user = new AuthenticatedUserModel();
        user.firstname='fake firstname';
        user.lastname='fake lastname';
        logger.warn('returning fake user !', user);
        return user;

        */

       const currentUser = await this.userRepositoryService.findByUserName(credentials.username);
       if (!currentUser) {
        const secretKey = JWT_CONFIG.jwtSecret;
        const hash = crypto.createHmac('sha256', secretKey).update(credentials.password).digest('hex');
        logger.debug('User not found!');
        logger.debug('login user:', credentials.username);
        logger.debug('login password hash:', hash);
        throw new BadRequestException('The specified user does not exists');
       }
   
       const isValid = await this.checkUserPassword(currentUser, credentials.password);
       if (!isValid) {

         throw new BadRequestException('The username/password combination is invalid');
       }
   
       const tokens = await this.jwtService.generateToken(currentUser);
   
       const authUser: AuthenticatedUserModel = currentUser as any as  AuthenticatedUserModel;
       const authUserTokens: TokensModel = new TokensModel();
       Object.assign(authUserTokens, tokens);
       authUser.tokens = authUserTokens;
       logger.debug('User found:', authUser);
       return authUser;
    }

    private async checkUserPassword(signedUser: AuthUserEntity, password: string ): Promise<boolean> 
    {
        // use crypto
        const secretKey = JWT_CONFIG.jwtSecret;
        const hash = crypto.createHmac('sha256', secretKey).update(password).digest('hex');
        logger.debug('login user:', signedUser.username);
        logger.debug('login password hash:', hash);

        if (hash === signedUser.password) return true;
        return false;
    }

    async refreshToken(token: string): Promise<any> {
        const user: AuthUserEntity = await this.jwtService.verify(token);
        const tokens = await this.jwtService.generateToken(user);

        const authUser: AuthenticatedUserModel = user as  AuthenticatedUserModel;
        const authUserTokens: TokensModel = new TokensModel();
        Object.assign(authUserTokens, tokens);
        authUser.tokens = authUserTokens;
        return authUser;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<AuthUserEntity | null> {
        const secretKey = JWT_CONFIG.jwtSecret;
        const hash = crypto.createHmac('sha256', secretKey).update(createUserDTO.password).digest('hex');
    
        const user = new AuthUserEntity();
        user.username = createUserDTO.username;
        user.nom = createUserDTO.nom;
        user.prenom = createUserDTO.prenom;
        user.password = hash;
        user.email = createUserDTO.email;
        //user.enabled = true;
    
        return this.userRepositoryService.saveUser(user);
    }
   
    async identifyUser(requestHeaderAuthorization: string): Promise<AuthUserEntity | null> {
        if (requestHeaderAuthorization && requestHeaderAuthorization.length > 7) {
          const token = requestHeaderAuthorization.substring(7);
          try {
            return await this.jwtService.verify(token, true);
          } catch (err) {
            logger.error('Verify user error', JSON.stringify(err));
          }
        }
        return null;
    }

    async existsUsername(userName: string): Promise<AuthUserEntity> 
    {
        // return this.authUserRepository.findOne( { where: { username: userName} } );
        return null;
    }
}
