import { injectable, inject } from 'tsyringe';

import ITagsRepository from '../repositories/ITagsRepository';
import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  id: string;
  title?: string;
  body?: string;
  color?: number;
  tag_id?: string;
}

@injectable()
class UpdateNoteService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id, id, title, body, color, tag_id }: IRequest): Promise<Note> {
    const note = await this.notesRepository.findById(id);
    if (!note) throw new AppError('Note not found.', 404);

    if (note.user_id !== user_id) throw new AppError('You cannot update this note.', 403);

    if (title) {
      if (title === 'null') {
        note.title = null;
      } else {
        note.title = title;
      }
    }
    if (body) note.body = body;
    if (color) note.color = color;
    if (tag_id) {
      if (tag_id === 'null') {
        note.tag = null;
      } else {
        const tag = await this.tagsRepository.findById(tag_id);
        if (!tag) throw new AppError('Tag not found.', 404);
        if (tag.user_id !== user_id) throw new AppError('You cannot use this tag.', 403);

        note.tag = tag;
      }
    }

    await this.notesRepository.save(note);

    return note;
  }
}

export default UpdateNoteService;
