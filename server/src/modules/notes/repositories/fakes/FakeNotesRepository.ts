import { uuid } from 'uuidv4';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import IFindAllNotesDTO from '@modules/notes/dtos/IFindAllNotesDTO';

import Note from '../../infra/typeorm/entities/Note';

class FakeNotesRepository implements INotesRepository {
  private notes: Note[] = [];

  public async findById(id: string): Promise<Note | undefined> {
    const findNote = this.notes.find(note => note.id === id);

    return findNote;
  }

  public async findAll({ user_id, tag, query, status }: IFindAllNotesDTO): Promise<Note[]> {
    let notes = this.notes.filter(noteItem =>
      (noteItem.user_id === user_id) &&
      (noteItem.status === status)
    );

    if (query) {
      notes = notes.filter(noteItem =>
        noteItem.title?.includes(query) || noteItem.body.includes(query)
      )
    }

    // TODO: Filter by tag

    return notes;
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
