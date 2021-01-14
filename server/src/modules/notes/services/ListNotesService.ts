import { injectable, inject } from 'tsyringe';

import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';
import NoteStatus from '../dtos/NoteStatus';

interface IRequest {
  user_id: string;
  tag_id?: string;
  query?: string;
  status: NoteStatus;
  page: number;
}

interface IResponse {
  data: Note[];
  count: number;
}

@injectable()
class ListNotesService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ user_id, tag_id, query, status, page }: IRequest): Promise<IResponse> {
    const { data, count } = await this.notesRepository.findAll({
      user_id,
      tag_id,
      query,
      status,
      page
    });

    return { data, count };
  }
}

export default ListNotesService;
