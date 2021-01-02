import { uuid } from 'uuidv4';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import IFindAllNotesDTO from '@modules/notes/dtos/IFindAllNotesDTO';

import Note from '../../infra/typeorm/entities/Note';

class FakeNotesRepository implements INotesRepository {
  private notes: Note[] = [];

  public async findAll({ tag, query }: IFindAllNotesDTO): Promise<Note[]> {
    // const notes = this.notes.filter(noteItem => noteItem.tag === tag);
    // TODO: Filter by tag and query

    return this.notes;
  }

  public async create(noteData: ICreateNoteDTO): Promise<Note> {
    const note = new Note();

    Object.assign(note, noteData, { id: uuid() });

    this.notes.push(note);

    return note;
  }

  public async save(note: Note): Promise<Note> {
    const findIndex = this.notes.findIndex(findNote => findNote.id === note.id);

    this.notes[findIndex] = note;

    return note;
  }

  public async delete(note: Note): Promise<void> {
    const findIndex = this.notes.findIndex(findNote => findNote.id === note.id);

    this.notes.splice(findIndex, 1);
  }
}

export default FakeNotesRepository;
