import { injectable, inject } from 'tsyringe';

import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  id: string;
  title?: string;
  body: string;
  color: number;
}

@injectable()
class UpdateNoteService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id, id, title, body, color }: IRequest): Promise<Note> {
    const note = await this.notesRepository.findById(id);
    if (!note) throw new AppError('Note not found.', 404);

    if (note.user_id !== user_id) throw new AppError('You cannot update this note.', 403);

    if (title) note.title = title;
    note.body = body;
    note.color = color;

    await this.notesRepository.save(note);

    return note;
  }
}

export default UpdateNoteService;
