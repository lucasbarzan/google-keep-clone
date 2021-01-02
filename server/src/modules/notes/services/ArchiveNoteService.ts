import { injectable, inject } from 'tsyringe';

import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';
import AppError from '@shared/errors/AppError';
import NoteStatus from '../dtos/NoteStatus';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class ArchiveNoteService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<Note> {
    const note = await this.notesRepository.findById(id);

    if (!note) throw new AppError('Note not found.', 404);

    if (note.user_id !== user_id) throw new AppError('You cannot archive this note.', 403);

    note.status = NoteStatus.ARCHIVED;

    await this.notesRepository.save(note);

    return note;
  }
}

export default ArchiveNoteService;
