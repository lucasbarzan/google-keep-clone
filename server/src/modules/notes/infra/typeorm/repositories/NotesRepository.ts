import { getRepository, Repository, Not } from 'typeorm';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import IFindAllNotesDTO from '@modules/notes/dtos/IFindAllNotesDTO';
import Note from '../entities/Note';

class NotesRepository implements INotesRepository {
  private ormRepository: Repository<Note>;

  constructor() {
    this.ormRepository = getRepository(Note);
  }

  public async findAll({ tag, query }: IFindAllNotesDTO): Promise<Note[]> {
    // TODO: LIKE query
    const notes = await this.ormRepository.find({
      where: {
        tag,
      }
    });

    return notes;
  }

  public async create(noteData: ICreateNoteDTO): Promise<Note> {
    const Note = this.ormRepository.create(noteData);

    await this.ormRepository.save(Note);

    return Note;
  }

  public async save(Note: Note): Promise<Note> {
    return this.ormRepository.save(Note);
  }

  public async delete(note: Note): Promise<void> {
    this.ormRepository.remove(note);
  }
}

export default NotesRepository;
