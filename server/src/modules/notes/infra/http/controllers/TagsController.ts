import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTagService from '@modules/notes/services/CreateTagService';
import ListTagsService from '@modules/notes/services/ListTagsService';
import UpdateTagService from '@modules/notes/services/UpdateTagService';
import DeleteTagService from '@modules/notes/services/DeleteTagService';
import { classToClass } from 'class-transformer';

export default class TagsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listTags = container.resolve(ListTagsService);

    const tags = await listTags.execute({
      user_id,
    });

    return response.json(classToClass(tags));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id: user_id } = request.user;

    const createTag = container.resolve(CreateTagService);

    const tag = await createTag.execute({
      user_id,
      name,
    });

    return response.json(classToClass(tag));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;
    const { id: user_id } = request.user;

    const updateTag = container.resolve(UpdateTagService);

    const updatedTag = await updateTag.execute({
      user_id,
      id,
      name,
    });

    return response.json(classToClass(updatedTag));
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const deleteTag = container.resolve(DeleteTagService);

    await deleteTag.execute({
      user_id,
      id,
    });

    return response.status(204);
  }
}
