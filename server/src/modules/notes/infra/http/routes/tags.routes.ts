import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TagsController from '../controllers/TagsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.use(ensureAuthenticated);

tagsRouter.get(
  '/',
  tagsController.index,
);

tagsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(255).required(),
    },
  }),
  tagsController.create,
);

tagsRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().max(255),
    },
  }),
  tagsController.update,
);

tagsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tagsController.destroy,
);

export default tagsRouter;
