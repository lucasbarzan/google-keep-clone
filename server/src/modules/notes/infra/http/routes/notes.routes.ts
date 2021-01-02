import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import NotesController from '../controllers/NotesController';
import ArchivedNotesController from '../controllers/ArchivedNotesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const notesRouter = Router();
const notesController = new NotesController();
const archivedNotesController = new ArchivedNotesController();

notesRouter.use(ensureAuthenticated);

notesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      tag: Joi.string().uuid(),
      query: Joi.string(),
    },
  }),
  notesController.index,
);

notesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string(),
      body: Joi.string().required(),
      color: Joi.number().required(),
    },
  }),
  notesController.create,
);

notesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string(),
      body: Joi.string().required(),
      color: Joi.number().required(),
    },
  }),
  notesController.update,
);

notesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  notesController.destroy,
);

notesRouter.post(
  '/archive/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  archivedNotesController.create,
);

notesRouter.delete(
  '/archive/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  archivedNotesController.destroy,
);
    
export default notesRouter;
