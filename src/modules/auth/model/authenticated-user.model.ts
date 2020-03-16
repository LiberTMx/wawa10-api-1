import { TokensModel } from './tokens.model';
import { AuthUserEntity } from '../../repository/user/entities/auth-user.entity';
import { AuthRoleEntity } from '../../repository/user/entities/auth-role.entity';

export class AuthenticatedUserModel extends AuthUserEntity {
    tokens: TokensModel;
    roles: AuthRoleEntity[];
}
