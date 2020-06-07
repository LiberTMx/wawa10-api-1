import { AuthUserEntity } from '../../repository/user/entities/auth-user.entity';
import { InterclubsSelectionEntity } from '../../repository/interclubs/entities/interclubs-selection.entity';

export class InterclubsEnrichedSelectionModel
{
    constructor(
         public selection: InterclubsSelectionEntity,
         public user: AuthUserEntity,
    ) {  }
}
