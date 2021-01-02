import { getRepository, Repository } from 'typeorm';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import IFindAllNotesDTO from '@modules/notes/dtos/IFindAllNotesDTO';
import Note from '../entities/Note';

class NotesRepository implements INotesRepository {
  private ormRepository: Repository<Note>;

  constructor() {
    this.ormRepository = getRepository(Note);
  }

  public async findById(id: string): Promise<Note | undefined> {
    const note = await this.ormRepository.findOne(id);

    return note;
  }

  public async findAll({ user_id, tag, query, status }: IFindAllNotesDTO): Promise<Note[]> {
    let dbQuery = this.ormRepository
      .createQueryBuilder('note');

    dbQuery = dbQuery
      .where('note.status = :status', {
        status,
      })
      .andWhere('note.user_id = :user_id', {
        user_id,
      });

    if (tag) {
      dbQuery = dbQuery
        .andWhere('note.tag = :tag', {
          tag,
        });
    }

    if (query) {
      dbQuery = dbQuery
        .andWhere('(note.title LIKE :query OR note.body LIKE :query)', {
          query: `%${query}%`,
        });
    }

    const notes = await dbQuery
      .orderBy('note.created_at', 'DESC')
      .getMany();

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