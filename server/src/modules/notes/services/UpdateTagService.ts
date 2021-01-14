import { injectable, inject } from 'tsyringe';

import ITagsRepository from '../repositories/ITagsRepository';
import Tag from '../infra/typeorm/entities/Tag';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  id: string;
  name?: string;
}

@injectable()
class UpdateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({ user_id, id, name }: IRequest): Promise<Tag> {
    const tag = await this.tagsRepository.findById(id);
    if (!tag) throw new AppError('Tag not found.', 404);

    if (tag.user_id !== user_id) throw new AppError('You cannot update this tag.', 403);

    if (typeof name !== 'undefined') tag.name = name;

    await this.tagsRepository.save(tag);

    return tag;
  }
}

export default UpdateTagService;
