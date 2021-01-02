import Tag from '../infra/typeorm/entities/Tag';
import ICreateTagDTO from '../dtos/ICreateTagDTO';

export default interface ITagsRepository {
  findById(id: string): Promise<Tag | undefined>;
  findAllByUserId(user_id: string): Promise<Tag[]>;
  create(data: ICreateTagDTO): Promise<Tag>;
  save(tag: Tag): Promise<Tag>;
  delete(tag: Tag): Promise<void>;
}
