import { NewsDocEntity } from '../../../modules/repository/news/entities/news-doc.entity';
import { NewsImageEntity } from '../../../modules/repository/news/entities/news-image.entity';
import { NewsEntity } from '../../../modules/repository/news/entities/news.entity';

export class CreateNewsResponseDTO 
{
    constructor(
        public news: NewsEntity,
        public image: NewsImageEntity,
        public doc: NewsDocEntity,
    ) {}
}
