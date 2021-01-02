import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ArchiveNoteService from '@modules/notes/services/ArchiveNoteService';
import UnarchiveNoteService from '@modules/notes/services/UnarchiveNoteService';
import { classToClass } from 'class-transformer';

export default class ArchivedNotesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const archiveNote = container.resolve(ArchiveNoteService);

    const archivedNote = await archiveNote.execute({
      user_id,
      id,
    });

    return response.json(classToClass(archivedNote));
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const unarchiveNote = container.resolve(UnarchiveNoteService);

    const unarchivedNote = await unarchiveNote.execute({
      user_id,
      id,
    });

    return response.json(classToClass(unarchivedNote));
  }
}
