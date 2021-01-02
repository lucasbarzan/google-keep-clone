import { injectable, inject } from 'tsyringe';

import ITagsRepository from '../repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DeleteNoteService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<void> {
    const tag = await this.tagsRepository.findById(id);

    if (!tag) throw new AppError('Tag not found.', 404);

    if (tag.user_id !== user_id) throw new AppError('You cannot delete this tag.', 403);

    await this.tagsRepository.delete(tag);
  }
}

export default DeleteNoteService;
