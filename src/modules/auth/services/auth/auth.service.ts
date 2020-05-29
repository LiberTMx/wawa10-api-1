import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthenticatedUserModel } from '../../model/authenticated-user.model';
import { BaseRepository, Transactional } from 'typeorm-transactional-cls-hooked';

import * as crypto from 'crypto';
import * as log4js from 'log4js';
import * as guid from 'guid';

import { TokensModel } from '../../model/tokens.model';
import { JwtService, JWT_CONFIG } from '../jwt/jwt.service';
import { UserRepositoryService } from '../../../repository/user/services/user-repository/user-repository.service';
import { CreateUserDTO } from '../../../../shared/dto/create-user.dto';
import { AuthUserEntity } from '../../../repository/user/entities/auth-user.entity';
import { CredentialRepositoryService } from '../../../repository/credential/services/credential-repository.service';
import { CredentialEntity } from '../../../repository/credential/entities/credential.entity';
import { MailService } from '../../../mail/services/mail/mail.service';
import { AuthRoleEntity } from '../../../repository/user/entities/auth-role.entity';
import { AuthDomainRepositoryService } from '../../../repository/user/services/auth-domain-repository/auth-domain-repository.service';
import { AuthDomainEntity } from '../../../repository/user/entities/auth-domain.entity';
import { AuthDomainModel } from '../../../repository/user/model/auth-domain.model';
import { AuthGroupEntity } from '../../../repository/user/entities/auth-group.entity';
import { AuthGroupRepositoryService } from '../../../repository/user/services/auth-group-repository/auth-group-repository.service';
import { AuthGroupModel } from '../../../repository/user/model/auth-group.model';
import { MessageDTO } from '../../../../shared/dto/contact/message.dto';
import { EmailDestinationType } from '../../../mail/types/email-destination-type.enum';
import { AuthFonctionEntity } from '../../../repository/user/entities/auth-fonction.entity';
import { AuthFonctionModel } from '../../../repository/user/model/auth-fonction.model';
import { AuthRoleRepositoryService } from '../../../repository/user/services/auth-role-repository/auth-role-repository/auth-role-repository.service';
import { AuthGroupRoleRepositoryService } from '../../../repository/user/services/auth-group-role-repository/auth-group-role-repository.service';
import { AuthGroupRoleEntity } from '../../../repository/user/entities/auth-group-role.entity';
import { AuthUserFonctionEntity } from '../../../repository/user/entities/auth-user-fonction.entity';
import { AuthUserGroupEntity } from '../../../repository/user/entities/auth-user-group.entity';

const logger = log4js.getLogger('AuthService');

@Injectable()
export class AuthService 
{

    constructor(
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        private readonly userRepositoryService: UserRepositoryService,
        private readonly authDomainRepositoryService: AuthDomainRepositoryService,
        private readonly authGroupRepositoryService: AuthGroupRepositoryService,
        private readonly authGroupRoleRepositoryService: AuthGroupRoleRepositoryService,
        private readonly authRoleRepositoryService: AuthRoleRepositoryService,
        private readonly credentialRepositoryService: CredentialRepositoryService,
    ) {}

    @Transactional()
    async login(credentials: { username: string; password: string }): Promise<AuthenticatedUserModel>
    {
        /*
        const user = new AuthenticatedUserModel();
        user.firstname='fake firstname';
        user.lastname='fake lastname';
        logger.warn('returning fake user !', user);
        return user;

        */

       let currentUser = await this.userRepositoryService.findByUserName(credentials.username);
       if (!currentUser) {
        const secretKey = JWT_CONFIG.jwtSecret;
        const hash = crypto.createHmac('sha256', secretKey).update(credentials.password).digest('hex');
        logger.debug('User not found!');
        logger.debug('login user:', credentials.username);
        logger.debug('login password hash:', hash);
        throw new BadRequestException('The specified user does not exists');
       }
       else
       {
        logger.debug('Found user:', currentUser);
       }

       if(currentUser.initCredential === true)
       {
          logger.debug('initializing credentials for user:', currentUser.username);
          const credential: CredentialEntity=await this.createOrUpdateUserCredential(currentUser, credentials);
          logger.debug('credential:', credential);
          if(credential!=null)
          {
            const updatedUser: AuthUserEntity = await this.updateUserWithCryptedPassword(currentUser);
            if(updatedUser === null || updatedUser === undefined)
            {
              throw new BadRequestException('The username/password combination is invalid (crypto)');
            }
            currentUser = updatedUser;
          }
       }
   
       const isValid = await this.checkUserPassword(currentUser, credentials.password);
       if (!isValid) {

         throw new BadRequestException('The username/password combination is invalid');
       }
   
       currentUser.lastLoginAt=new Date();
       if(currentUser.mustChangePassword===true)
       {
         currentUser.changePasswordJeton=this.buildChangePasswordJeton();
         try
         {
           const mailMessage=this.buildMailMessageForChangePasswordJeton(currentUser);
           const msg= new MessageDTO();
           msg.email=currentUser.email;
           msg.message='Votre jeton pour votre nouveau mot de passe: '+ currentUser.changePasswordJeton;
           msg.subject='CTT Limal-Wavre - Jeton';
           msg.name='noop';
           msg.destinationType=EmailDestinationType.TO_USER;
           this.mailService.sendMessage(msg);
         }
         catch(e)
         {
           logger.error('Error sending mail !', e);
           // nothing
         }
       }
       currentUser=await this.userRepositoryService.saveUser(currentUser);
       const tokens = await this.jwtService.generateToken(currentUser);
   
       const authUser: AuthenticatedUserModel = currentUser as any as  AuthenticatedUserModel;
       const authUserTokens: TokensModel = new TokensModel();
       Object.assign(authUserTokens, tokens);
       authUser.tokens = authUserTokens;
       const roles=await this.userRepositoryService.getUserRoles(authUser.id);
       
       if(roles!==null && roles!==undefined)
       {
         if(roles.length>0)
         {
          const rr: AuthRoleEntity[]=new Array<AuthRoleEntity>();
          for(const r of roles)
          {
            const domain: AuthDomainEntity=await this.authDomainRepositoryService.findDomainById(r.domain_id);
            if(domain!==null && domain!==undefined) 
            {
              //rr.push(role);
              const role=new AuthRoleEntity();
              role.id=r.id;
              role.role=r.role;
              role.authDomain=domain;
              rr.push(role);
            }
          }
          authUser.roles=rr;
         }

         logger.debug('Auth User found:', authUser);
         
       }
       return authUser;
    }

    private async getUserRoles(user: AuthUserEntity): Promise<AuthRoleEntity[]>
    {
      const roles=await this.userRepositoryService.getUserRoles(user.id);
      const rr: AuthRoleEntity[]=new Array<AuthRoleEntity>();

      if(roles!==null && roles!==undefined)
      {
        if(roles.length>0)
        {
         
         for(const r of roles)
         {
           const domain: AuthDomainEntity=await this.authDomainRepositoryService.findDomainById(r.domain_id);
           if(domain!==null && domain!==undefined) 
           {
             //rr.push(role);
             const role=new AuthRoleEntity();
             role.id=r.id;
             role.role=r.role;
             role.authDomain=domain;
             rr.push(role);
           }
         }
        }
      }
      return rr;
    }

    private buildChangePasswordJeton(): string
    {
      return guid.raw();
    }

    private buildMailMessageForChangePasswordJeton(currentUser: AuthUserEntity): string
    {
      const message=
          '<h1>Modification de votre mot de passe</h1>' 
        + '<p>Dans le formulaire de changement de votre mot de passe, </p>'
        + '<p>il vous est demandé d\'indiquer un "jeton".</p>'
        + '<p>Votre jeton est:</p>'
        + '<p>'+currentUser.changePasswordJeton+'</p>'
        + '<br>'
      ;
      return message;
    }

    private async updateUserWithCryptedPassword(user: AuthUserEntity): Promise<AuthUserEntity>
    {
      const secretKey = JWT_CONFIG.jwtSecret;
      const passwordHash=crypto.createHmac('sha256', secretKey).update(user.password).digest('hex');
      logger.debug('saving password hash', user.password, passwordHash);
      user.password=passwordHash;
      user.initCredential=false;
      return await this.userRepositoryService.saveUser(user);
    }

    private async createOrUpdateUserCredential(currentUser: AuthUserEntity, credentials: { username: string; password: string })
    : Promise<CredentialEntity>
    {
      const credential=await this.credentialRepositoryService.findByUserName(credentials.username);
      logger.debug('credential for '+credentials.username, credential);
      if(credential===null || credential===undefined)
      {

        //if(currentUser.password === credentials.password)
        {
          // ok on peut créer le credential
          return await this.credentialRepositoryService.createCredential(credentials.username, credentials.password);
        }
      }
      credential.credential=credentials.password;
      return await this.credentialRepositoryService.save(credential);
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
        //if (requestHeaderAuthorization && requestHeaderAuthorization.length > 7) {
        const token = requestHeaderAuthorization;//.substring(7);
        try {
          return await this.jwtService.verify(token, true);
        } catch (err) {
          logger.error('Verify user error', JSON.stringify(err));
        }
        //}
        return null;
    }

    async existsUsername(userName: string): Promise<AuthUserEntity> 
    {
        // return this.authUserRepository.findOne( { where: { username: userName} } );
        return null;
    }

    @Transactional()
    async changePassword(data: { username: string; password: string; jeton: string }): Promise<AuthenticatedUserModel>
    {
      const currentUser = await this.userRepositoryService.findByUserName(data.username);
      if(currentUser!==null && currentUser!==undefined)
      {
        if(currentUser.changePasswordJeton === data.jeton)
        {
          this.createOrUpdateUserCredential(currentUser/*: AuthUserEntity*/, 
                          /*credentials:*/ { username: data.username, password: data.password });
          const secretKey = JWT_CONFIG.jwtSecret;
          const hash = crypto.createHmac('sha256', secretKey).update(data.password).digest('hex');
          currentUser.password=hash;
          currentUser.mustChangePassword=false;
          this.userRepositoryService.saveUser(currentUser);
          const tokens = await this.jwtService.generateToken(currentUser);
   
          const authUser: AuthenticatedUserModel = currentUser as any as  AuthenticatedUserModel;
          const authUserTokens: TokensModel = new TokensModel();
          Object.assign(authUserTokens, tokens);
          authUser.tokens = authUserTokens;
          logger.debug('User found - password changed:', authUser);
          return authUser;
        }
        else
        {
          throw new BadRequestException('Invalid jeton', '1001');
        }

      }
      throw new BadRequestException('Still not implemented!', '9999');
    }

    async getAllAuthDomains(): Promise<AuthDomainEntity[]>
    {
      return await this.authDomainRepositoryService.getAllAuthDomains();
    }

    async getAllAuthRoles(): Promise<AuthRoleEntity[]>
    {
      return await this.authRoleRepositoryService.getAllAuthRoles();
    }

    async getAllAuthGroupRoles(): Promise<AuthGroupRoleEntity[]>
    {
      return await this.authGroupRoleRepositoryService.getAllAuthGroupRoles();
    }

    async createAuthDomain(authDomainModel: AuthDomainModel): Promise<AuthDomainEntity>
    {
      return await this.authDomainRepositoryService.createAuthDomain(authDomainModel);
    }

    async getAllAuthGroups(): Promise<AuthGroupEntity[]>
    {
      return await this.authGroupRepositoryService.getAllAuthGroups();
    }

    async createAuthGroup(authGroupModel: AuthGroupModel): Promise<AuthGroupEntity>
    {
      return await this.authGroupRepositoryService.createAuthGroup(authGroupModel);
    }

    async getUserList(readAll: boolean = false): Promise<AuthUserEntity[]>
    {
      return await this.userRepositoryService.getUserList(readAll);
    }

    async getUserById(userId: number): Promise<AuthUserEntity>
    {
      return await this.userRepositoryService.findUserById(userId);
    }
    
    async getUserByLicence(licence: string): Promise<AuthUserEntity>
    {
      return await this.userRepositoryService.getUserByLicence(licence);
    }

    async getAllUserFonction(): Promise<AuthFonctionEntity[]>
    {
      return await this.userRepositoryService.getAllUserFonction();
    }

    async createAuthFonction(fonction: AuthFonctionModel): Promise<AuthFonctionEntity>
    {
        const f= new AuthFonctionEntity();
        f.code=fonction.code;
        f.designation=fonction.designation;
        f.description=fonction.description;
        f.deletable=fonction.deletable;
        f.membreComite=fonction.membreComite;
        f.ordreAffichage=fonction.ordreAffichage;
        await this.saveFonction(f);
        return await this.findFonctionByCode(f.code);
    }
    
    async saveFonction(fonction: AuthFonctionEntity): Promise<AuthFonctionEntity> 
    {
        return this.userRepositoryService.saveFonction(fonction);
    }

    async findFonctionByCode(code: string): Promise<AuthFonctionEntity> 
    {
        return this.userRepositoryService.findFonctionByCode(code);
    }

    async findUserByLicence(licence: string): Promise<AuthUserEntity>
    {
      return this.userRepositoryService.findUserByLicence(licence);
    }

    async createUserByForm(userFormValue: any, assignedFonctions: string, assignedRoles: string): Promise<AuthUserEntity>
    {
      const u = new AuthUserEntity();
      u.nom=userFormValue.nom;
      u.prenom=userFormValue.prenom;
      u.username=userFormValue.username;
      u.email=userFormValue.email;

      const dateString = '20180715';
      // 16/09/1962
      const year = +dateString.substr(6, 4);
      const month = (+dateString.substr(3, 2) ) - 1;
      const day = +dateString.substr(0, 2);
      const dateNaissance = new Date(year, month, day);

      u.dateNaissance=dateNaissance;
      u.gestionParentale=userFormValue.gestionParentale;

      u.rue=userFormValue.rue;
      u.numero=userFormValue.numero;
      u.boite=userFormValue.boitre;
      u.codePostal=userFormValue.codePostal;
      u.localite=userFormValue.localite;

      u.numTel=userFormValue.tel;
      u.numTelPrive=userFormValue.telPrive;
      u.numMobile=userFormValue.gsm;
      u.sexe=userFormValue.sexe;
      u.licence=userFormValue.licence;
      u.classementMessieur=userFormValue.classementH;
      u.classementDame=userFormValue.classementD;
      u.comment=userFormValue.comment;
      u.commentComite=userFormValue.commentComite;
      u.isStageParticipantDiscret= userFormValue.isStageParticipantDiscret;

      // password par defaut: newLiwaUserPwd
      u.password='6fd65094fbfce71dd68b619ad8cbbacf7d08c7d9f6d9b33468e59134b5288f00';
      u.mustChangePassword=true;
      u.membreComite=false;
      const now: Date=new Date();
      u.createdAt=now;
      u.updateddAt=now;

      // Les fonctions
      let isMembreComite=false;
      const fonctions: AuthFonctionEntity[] = JSON.parse(assignedFonctions);
      if(fonctions!==null && fonctions!==undefined && fonctions.length>0)
      {
        for(const f of fonctions)
        {
          if(f.membreComite===true)
          {
            isMembreComite=true;
            break;
          }
        }
      }
      u.membreComite=isMembreComite;
      const user = await this.userRepositoryService.saveUser(u);
      
      if(fonctions!==null && fonctions!==undefined && fonctions.length>0)
      {
        for(const f of fonctions)
        {
          const auf = new AuthUserFonctionEntity();
          auf.authUserID=user.id;
          auf.fonctionID=f.id;
          await this.userRepositoryService.saveAuthUserFonction(auf);
        }
      }

      // Les groupes de roles
      const groups: AuthGroupEntity[]=JSON.parse(assignedRoles);
      if(groups!==null && groups!==undefined && groups.length>0)
      {
        for(const g of groups)
        {
          const ug = new AuthUserGroupEntity();
          ug.authUserId=user.id;
          ug.authGroupId=g.id;
          await this.userRepositoryService.saveAuthUserGroup(ug);
        }
      }

      return user;
    }

    async getGroupsForUser(userId: number): Promise<AuthGroupEntity[]>
    {
      return this.authGroupRepositoryService.getGroupsForUser(userId);
    }

    @Transactional()
    async updateUserByForm(userFormValue: any, assignedFonctions: string, assignedRoles: string)//: Promise<AuthUserEntity>
    {
      const userId=userFormValue.id;

      logger.debug('Reading User to update...!');
      const u = await this.getUserById(userId);
      logger.debug('User to update is found!');

      u.nom=userFormValue.nom;
      u.prenom=userFormValue.prenom;
      //u.username=userFormValue.username;
      u.email=userFormValue.email;

      //const dateString = '20180715';
      // 16/09/1962
      if(userFormValue.dateNaissance!==null && userFormValue.dateNaissance!==undefined && userFormValue.dateNaissance.length===10)
      {
        const dateString =userFormValue.dateNaissance;
        const year = +dateString.substr(6, 4);
        const month = (+dateString.substr(3, 2) ) - 1;
        const day = +dateString.substr(0, 2);
        const dateNaissance = new Date(year, month, day);
  
        u.dateNaissance=dateNaissance;
      }

      u.gestionParentale=userFormValue.gestionParentale;

      u.rue=userFormValue.rue;
      u.numero=userFormValue.numero;
      u.boite=userFormValue.boitre;
      u.codePostal=userFormValue.codePostal;
      u.localite=userFormValue.localite;

      u.numTel=userFormValue.tel;
      u.numTelPrive=userFormValue.telPrive;
      u.numMobile=userFormValue.gsm;
      u.sexe=userFormValue.sexe;
      u.licence=userFormValue.licence;
      u.classementMessieur=userFormValue.classementH;
      u.classementDame=userFormValue.classementD;
      u.comment=userFormValue.comment;
      u.commentComite=userFormValue.commentComite;
      u.isStageParticipantDiscret= userFormValue.isStageParticipantDiscret;

      // password par defaut: newLiwaUserPwd
      //u.password='6fd65094fbfce71dd68b619ad8cbbacf7d08c7d9f6d9b33468e59134b5288f00';
      //u.mustChangePassword=true;
      u.membreComite=false;
      const now: Date=new Date();
      //u.createdAt=now;
      u.updateddAt=now;

      // Les fonctions
      await this.deleteFonctionsForUser(u);
      u.fonctions=null;

      let isMembreComite=false;
      const fonctions: AuthFonctionEntity[] = JSON.parse(assignedFonctions);
      if(fonctions!==null && fonctions!==undefined && fonctions.length>0)
      {
        for(const f of fonctions)
        {
          if(f.membreComite===true)
          {
            isMembreComite=true;
            break;
          }
        }
      }
      u.membreComite=isMembreComite;

      logger.debug('Saving modifications!');
      const user = await this.userRepositoryService.saveUser(u);

      logger.debug('Modifications sauvées, construction des fonctions!', fonctions);

      if(fonctions!==null && fonctions!==undefined && fonctions.length>0)
      {
        for(const f of fonctions)
        {
          const auf = new AuthUserFonctionEntity();
          auf.authUserID=user.id;
          auf.fonctionID=f.id;
          await this.userRepositoryService.saveAuthUserFonction(auf);
        }
      }

      // Les groupes de roles
      logger.debug('Deleting groups!', u.id);
      await this.authGroupRepositoryService.deleteGroupsForUser(userId);
      const groups: AuthGroupEntity[]=JSON.parse(assignedRoles);
      logger.debug('rebuilding groups!', groups);
      if(groups!==null && groups!==undefined && groups.length>0)
      {
        for(const g of groups)
        {
          const ug = new AuthUserGroupEntity();
          ug.authUserId=user.id;
          ug.authGroupId=g.id;
          await this.userRepositoryService.saveAuthUserGroup(ug);
        }
      }

      /*
      const updatedUser= await this.getUserById(userId);
      logger.debug('Updated user:', updatedUser);
      return updatedUser;
      */
    }

    async deleteFonctionsForUser(user: AuthUserEntity)
    {
      if(user.fonctions!==null && user.fonctions!==undefined && user.fonctions.length> 0)
      {
        for(const uf of user.fonctions)
        {
          await await this.userRepositoryService.deleteUserAuthFonction(user, uf);
        }
      }
    }

    async deleteUserLogically(userId: number)
    {
      await this.userRepositoryService.deleteUserLogically(userId);
    }

    async deleteUserPermanently(userId: number)
    {
      await this.userRepositoryService.deleteUserPermanently(userId);
    }
    
    @Transactional()
    async reactivateUser(userId: number)
    {
      await this.userRepositoryService.reactivateUser(userId);
    }

    async verifyUserIsClubAdmain(user: AuthUserEntity): Promise<boolean>
    {
      // const roles=await this.userRepositoryService.getUserRoles(user.id);
      const roles: AuthRoleEntity[] = await this.getUserRoles(user);
      if(roles===null || roles===undefined) return false;

      for(const r of roles)
      {
        if(r.role === 'admin' && r.authDomain.domain==='club') return true;
      }
      return false;
    }

    async verifyUserIsStageAdmin(user: AuthUserEntity): Promise<boolean>
    {
      const roles: AuthRoleEntity[] = await this.getUserRoles(user);
      if(roles===null || roles===undefined) return false;

      for(const r of roles)
      {
        if(r.role === 'admin' && r.authDomain.domain==='stage') return true;
      }
      return false;
    }

    async verifyUserIsEntrainementAdmin(user: AuthUserEntity): Promise<boolean>
    {
      const roles: AuthRoleEntity[] = await this.getUserRoles(user);
      if(roles===null || roles===undefined) return false;

      for(const r of roles)
      {
        if(r.role === 'admin' && r.authDomain.domain==='entrainement') return true;
      }
      return false;
    }

    async resetUserPassword(userId: number): Promise<AuthUserEntity>
    {
      // return await this.userRepositoryService.resetUserPassword(userId); 
      const user: AuthUserEntity = await this.userRepositoryService.findUserById(userId);
      if(user===null || user===undefined || user.deletedAt !==null) return user;
      if(user.email === 'nobody@liwa.be')
      {
        // NE PAS FAIRE DE RESET DANS CE CAS ! Il faut une adresse mail VALIDE !
        throw new BadRequestException('Adresse email requise !');
      }

      // password par defaut: newLiwaUserPwd
      //             6fd65094fbfce71dd68b619ad8cbbacf7d08c7d9f6d9b33468e59134b5288f00
      // ovh:        6fd65094fbfce71dd68b619ad8cbbacf7d08c7d9f6d9b33468e59134b5288f00
      user.password='6fd65094fbfce71dd68b619ad8cbbacf7d08c7d9f6d9b33468e59134b5288f00';
      user.mustChangePassword=true;

      return this.userRepositoryService.saveUser(user);
    }

    async getComite(): Promise<AuthUserEntity[]>
    {
      return await this.userRepositoryService.getComite();
    }
}
