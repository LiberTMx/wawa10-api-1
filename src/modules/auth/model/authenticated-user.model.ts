import { TokensModel } from './tokens.model';
import { AuthUserEntity } from './auth-user.entity';

export class AuthenticatedUserModel extends AuthUserEntity {
    tokens: TokensModel;
}
