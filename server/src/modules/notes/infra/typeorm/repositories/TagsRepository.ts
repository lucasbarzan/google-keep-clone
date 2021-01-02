import { getRepository, Repository } from 'typeorm';

import ITagsRepository from '@modules/notes/repositories/ITagsRepository';
import ICreateTagDTO from '@modules/notes/dtos/ICreateTagDTO';
import Tag from '../entities/Tag';

class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async findById(id: string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne(id);

    return tag;
  }

  public async findAllByUserId(user_id: string): Promise<Tag[]> {
    const tags = await this.ormRepository.find({
      where: {
        user_id,
      }
    })

    return tags;
  }

  public async create(tagData: ICreateTagDTO): Promise<Tag> {
    const tag = this.ormRepository.create(tagData);

    await this.ormRepository.save(tag);

    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    return this.ormRepository.save(tag);
  }

  public async delete(tag: Tag): Promise<void> {
    this.ormRepository.remove(tag);
  }
}

export default TagsRepository;
