import { injectable, inject } from 'tsyringe';

import INotesRepository from '../repositories/INotesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DeleteNoteService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<void> {
    const note = await this.notesRepository.findById(id);

    if (!note) throw new AppError('Note not found.', 404);

    if (note.user_id !== user_id) throw new AppError('You cannot delete this note.', 403);

    await this.notesRepository.delete(note);
  }
}

export default DeleteNoteService;
