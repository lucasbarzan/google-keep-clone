import { uuid } from 'uuidv4';

import ITagsRepository from '@modules/notes/repositories/ITagsRepository';
import ICreateTagDTO from '@modules/notes/dtos/ICreateTagDTO';

import Tag from '../../infra/typeorm/entities/Tag';

class FakeTagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  public async findById(id: string): Promise<Tag | undefined> {
    const findTag = this.tags.find(tag => tag.id === id);

    return findTag;
  }

  public async findAllByUserId(user_id: string): Promise<Tag[]> {
    const tags = this.tags.filter(tag => (tag.user_id === user_id));

    return tags;
  }

  public async create(tagData: ICreateTagDTO): Promise<Tag> {
    const tag = new Tag();

    Object.assign(tag, tagData, { id: uuid() });

    this.tags.push(tag);

    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    const findIndex = this.tags.findIndex(findTag => findTag.id === tag.id);

    this.tags[findIndex] = tag;

    return tag;
  }

  public async delete(tag: Tag): Promise<void> {
    const findIndex = this.tags.findIndex(findTag => findTag.id === tag.id);

    this.tags.splice(findIndex, 1);
  }
}

export default FakeTagsRepository;
