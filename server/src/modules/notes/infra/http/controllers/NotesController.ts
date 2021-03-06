import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNoteService from '@modules/notes/services/CreateNoteService';
import ListNotesService from '@modules/notes/services/ListNotesService';
import UpdateNoteService from '@modules/notes/services/UpdateNoteService';
import DeleteNoteService from '@modules/notes/services/DeleteNoteService';
import { classToClass } from 'class-transformer';

export default class NotesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { tag_id, query, status, page } = request.query;
    const { id: user_id } = request.user;

    const listNotes = container.resolve(ListNotesService);

    const { data, count } = await listNotes.execute({
      user_id,
      tag_id: tag_id ? String(tag_id) : undefined,
      query: query ? String(query) : undefined,
      status: Number(status),
      page: Number(page),
    });

    return response.json({ data: classToClass(data), count });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, body, color, tag_id } = request.body;
    const { id: user_id } = request.user;

    const createNote = container.resolve(CreateNoteService);

    const note = await createNote.execute({
      user_id,
      title,
      body,
      color,
      tag_id,
    });

    return response.json(classToClass(note));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, body, color, tag_id } = request.body;
    const { id: user_id } = request.user;

    const updateNote = container.resolve(UpdateNoteService);

    const updatedNote = await updateNote.execute({
      user_id,
      id,
      title,
      body,
      color,
      tag_id,
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

    return response.status(204).json();
  }
}
