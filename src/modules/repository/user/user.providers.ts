import { Connection, Repository } from 'typeorm';
import { AuthUserEntity } from './entities/auth-user.entity';
import { AuthRoleEntity } from './entities/auth-role.entity';
import { AuthDomainEntity } from './entities/auth-domain.entity';
import { AuthGroupEntity } from './entities/auth-group.entity';
import { AuthFonctionEntity } from './entities/auth-fonction.entity';
import { AuthGroupRoleEntity } from './entities/auth-group-role.entity';
import { AuthUserFonctionEntity } from './entities/auth-user-fonction.entity';
import { AuthUserGroupEntity } from './entities/auth-user-group.entity';

export const userProvider = [
  {
    provide: 'AuthUserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthUserEntity),
    inject: ['DbConnectionToken'],
  },
];

export const userRoleProvider = [
  {
    provide: 'AuthRoleRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthRoleEntity),
    inject: ['DbConnectionToken'],
  },
];

export const authDomainProvider = [
  {
    provide: 'AuthDomainRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthDomainEntity),
    inject: ['DbConnectionToken'],
  },
];

export const authGroupProvider = [
  {
    provide: 'AuthGroupRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthGroupEntity),
    inject: ['DbConnectionToken'],
  },
];

export const authGroupRoleProvider = [
  {
    provide: 'AuthGroupRoleRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthGroupRoleEntity),
    inject: ['DbConnectionToken'],
  },
];

// AuthFonctionEntity
export const authFonctionProvider = [
  {
    provide: 'AuthFonctionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthFonctionEntity),
    inject: ['DbConnectionToken'],
  },
]; 

// AuthUserFonctionEntity
export const authUserFonctionProvider = [
  {
    provide: 'AuthUserFonctionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthUserFonctionEntity),
    inject: ['DbConnectionToken'],
  },
]; 

// AuthUserGroupEntity
export const authUserGroupProvider = [
  {
    provide: 'AuthUserGroupRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthUserGroupEntity),
    inject: ['DbConnectionToken'],
  },
]; 
