import { v4 as uuid } from 'uuid';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';
import IFindAllNotesDTO from '@modules/notes/dtos/IFindAllNotesDTO';

import Note from '../../infra/typeorm/entities/Note';
import IFindAllNotesResponseDTO from '@modules/notes/dtos/IFindAllNotesResponseDTO';

class FakeNotesRepository implements INotesRepository {
  private notes: Note[] = [];

  public async findById(id: string): Promise<Note | undefined> {
    const findNote = this.notes.find(note => note.id === id);

    return findNote;
  }

  public async findAll({ user_id, tag_id, query, status, page }: IFindAllNotesDTO): Promise<IFindAllNotesResponseDTO> {
    let notes = this.notes.filter(noteItem =>
      (noteItem.user_id === user_id) &&
      (noteItem.status === status)
    );

    if (query) {
      notes = notes.filter(noteItem =>
        noteItem.title?.includes(query) || noteItem.body.includes(query)
      )
    }

    if (tag_id) {
      notes = notes.filter(noteItem =>
        noteItem.tag_id === tag_id
      )
    }

    notes.splice(0, 25 * (page - 1))

    return { data: notes, count: notes.length };
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
