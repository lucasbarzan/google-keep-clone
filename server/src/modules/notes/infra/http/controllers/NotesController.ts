import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNoteService from '@modules/notes/services/CreateNoteService';
import ListNotesService from '@modules/notes/services/ListNotesService';
import UpdateNoteService from '@modules/notes/services/UpdateNoteService';
import DeleteNoteService from '@modules/notes/services/DeleteNoteService';
import { classToClass } from 'class-transformer';

export default class NotesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { tag, query, status } = request.query;
    const { id: user_id } = request.user;

    const listNotes = container.resolve(ListNotesService);

    const notes = await listNotes.execute({
      user_id,
      tag: tag ? String(tag) : undefined,
      query: query ? String(query) : undefined,
      status: Number(status),
    });

    return response.json(classToClass(notes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, body, color } = request.body;
    const { id: user_id } = request.user;

    const createNote = container.resolve(CreateNoteService);

    const note = await createNote.execute({
      user_id,
      title,
      body,
      color,
    });

    return response.json(classToClass(note));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, body, color } = request.body;
    const { id: user_id } = request.user;

    const updateNote = container.resolve(UpdateNoteService);

    const updatedNote = await updateNote.execute({
      user_id,
      id,
      title,
      body,
      color,
    });

    return response.json(classToClass(updatedNote));
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const deleteNote = container.resolve(DeleteNoteService);

    await deleteNote.execute({
      user_id,
      id,
    });

    return response.status(204);
  }
}
