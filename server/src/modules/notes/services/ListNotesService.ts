import { injectable, inject } from 'tsyringe';

import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';
import NoteStatus from '../dtos/NoteStatus';

interface IRequest {
  user_id: string;
  tag?: string;
  query?: string;
  status: NoteStatus;
}

@injectable()
class ListNotesService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id, tag, query, status }: IRequest): Promise<Note[]> {
    const notes = await this.notesRepository.findAll({
      user_id,
      tag,
      query,
      status,
    });

    return notes;
  }
}

export default ListNotesService;
