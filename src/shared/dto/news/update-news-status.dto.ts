
import { IsEmail, MinLength } from 'class-validator';
import { NewsType } from '../../../modules/news/types/news-status.enum';

/*
      id
      , username
      , firstname
      , lastname
      , password
      , email
      , role_id
      , enabled
*/
export class UpdateNewsStatusDTO {

    newsId: number;
    newStatus: NewsType;

}
