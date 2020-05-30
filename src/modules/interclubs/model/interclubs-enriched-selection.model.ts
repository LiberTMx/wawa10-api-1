import { InterclubsSelectionEntity } from "src/modules/repository/interclubs/entities/interclubs-selection.entity";
import { AuthUserEntity } from "src/modules/repository/user/entities/auth-user.entity";

export class InterclubsEnrichedSelectionModel
{
    constructor(
         public selection: InterclubsSelectionEntity,
         public user: AuthUserEntity
    ) {  }
}
