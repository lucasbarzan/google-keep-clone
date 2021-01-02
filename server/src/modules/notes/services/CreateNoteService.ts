import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';
import AppError from '@shared/errors/AppError';
import NoteStatus from '../dtos/NoteStatus';

interface IRequest {
  user_id: string;
  title: string;
  body: string;
  color: number;
}

@injectable()
class CreateNoteService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id, title, body, color }: IRequest): Promise<Note> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User not found.', 404);

    const note = await this.notesRepository.create({
      user_id,
      title,
      body,
      color,
      status: NoteStatus.ACTIVE,
    });

    return note;
  }
}

export default CreateNoteService;
