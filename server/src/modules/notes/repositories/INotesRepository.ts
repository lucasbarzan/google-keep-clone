import Note from '../infra/typeorm/entities/Note';
import ICreateNoteDTO from '../dtos/ICreateNoteDTO';
import IFindAllNotesDTO from '../dtos/IFindAllNotesDTO';

export default interface INotesRepository {
  findAll(data: IFindAllNotesDTO): Promise<Note[]>;
  create(data: ICreateNoteDTO): Promise<Note>;
  save(note: Note): Promise<Note>;
  delete(note: Note): Promise<void>;
}
