import { injectable, inject } from 'tsyringe';

import ITagsRepository from '../repositories/ITagsRepository';
import Tag from '../infra/typeorm/entities/Tag';

interface IRequest {
  user_id: string;
}

@injectable()
class ListTagsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Tag[]> {
    const tags = await this.tagsRepository.findAllByUserId(user_id);

    return tags;
  }
}

export default ListTagsService;
