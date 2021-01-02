import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITagsRepository from '../repositories/ITagsRepository';
import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';
import AppError from '@shared/errors/AppError';
import NoteStatus from '../dtos/NoteStatus';

interface IRequest {
  user_id: string;
  title: string;
  body: string;
  color: number;
  tag_id?: string;
}

@injectable()
class CreateNoteService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id, title, body, color, tag_id }: IRequest): Promise<Note> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User not found.', 404);

    if (tag_id) {
      const tag = await this.tagsRepository.findById(tag_id);
      if (!tag) throw new AppError('Tag not found.', 404);
      if (tag.user_id !== user_id) throw new AppError('You cannot use this tag.', 403);
    }

    const note = await this.notesRepository.create({
      user_id,
      title,
      body,
      color,
      tag_id,
      status: NoteStatus.ACTIVE,
    });

    return note;
  }
}

export default CreateNoteService;
