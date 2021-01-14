import Note from '../infra/typeorm/entities/Note';
import ICreateNoteDTO from '../dtos/ICreateNoteDTO';
import IFindAllNotesDTO from '../dtos/IFindAllNotesDTO';
import IFindAllNotesResponseDTO from '../dtos/IFindAllNotesResponseDTO';

export default interface INotesRepository {
  findById(id: string): Promise<Note | undefined>;
  findAll(data: IFindAllNotesDTO): Promise<IFindAllNotesResponseDTO>;
  create(data: ICreateNoteDTO): Promise<Note>;
  save(note: Note): Promise<Note>;
  delete(note: Note): Promise<void>;
}
