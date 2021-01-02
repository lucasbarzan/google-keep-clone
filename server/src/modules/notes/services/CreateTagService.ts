import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITagsRepository from '@modules/notes/repositories/ITagsRepository';
import Tag from '../infra/typeorm/entities/Tag';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
class CreateTagService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<Tag> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User not found.', 404);

    const tag = await this.tagsRepository.create({
      user_id,
      name,
    });

    return tag;
  }
}

export default CreateTagService;
