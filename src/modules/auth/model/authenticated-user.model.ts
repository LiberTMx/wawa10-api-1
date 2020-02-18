import { TokensModel } from './tokens.model';
import { AuthUserEntity } from '../../repository/user/entities/auth-user.entity';

export class AuthenticatedUserModel extends AuthUserEntity {
    tokens: TokensModel;
}
