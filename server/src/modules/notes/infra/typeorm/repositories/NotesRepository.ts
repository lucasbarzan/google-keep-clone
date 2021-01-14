import { getRepository, Repository } from 'typeorm';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import IFindAllNotesDTO from '@modules/notes/dtos/IFindAllNotesDTO';
import Note from '../entities/Note';
import IFindAllNotesResponseDTO from '@modules/notes/dtos/IFindAllNotesResponseDTO';

class NotesRepository implements INotesRepository {
  private ormRepository: Repository<Note>;

  constructor() {
    this.ormRepository = getRepository(Note);
  }

  public async findById(id: string): Promise<Note | undefined> {
    const note = await this.ormRepository.findOne(id, {
      relations: ['tag']
    });

    return note;
  }

  public async findAll({ user_id, tag_id, query, status, page }: IFindAllNotesDTO): Promise<IFindAllNotesResponseDTO> {
    let dbQuery = this.ormRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect("note.tag", "tag");

    dbQuery = dbQuery
      .where('note.status = :status', {
        status,
      })
      .andWhere('note.user_id = :user_id', {
        user_id,
      });

    if (tag_id) {
      dbQuery = dbQuery
        .andWhere('note.tag_id = :tag_id', {
          tag_id,
        });
    }

    if (query) {
      dbQuery = dbQuery
        .andWhere('(note.title LIKE :query OR note.body LIKE :query)', {
          query: `%${query}%`,
        });
    }

    const [data, count] = await dbQuery
      .skip(25 * (page - 1))
      .take(25)
      .orderBy('note.created_at', 'DESC')
      .getManyAndCount();

    return { data, count };
  }

  public async create(noteData: ICreateNoteDTO): Promise<Note> {
    const note = this.ormRepository.create(noteData);

    await this.ormRepository.save(note);

    return note;
  }

  public async save(Note: Note): Promise<Note> {
    return this.ormRepository.save(Note);
  }

  public async delete(note: Note): Promise<void> {
    this.ormRepository.remove(note);
  }
}

export default NotesRepository;
