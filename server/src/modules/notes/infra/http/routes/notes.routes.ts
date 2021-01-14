import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import NotesController from '../controllers/NotesController';
import ArchivedNotesController from '../controllers/ArchivedNotesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import NoteStatus from '@modules/notes/dtos/NoteStatus';
import NoteColors from '@modules/notes/dtos/NoteColors';

const notesRouter = Router();
const notesController = new NotesController();
const archivedNotesController = new ArchivedNotesController();

function getEnumValues(enumObj: any) {
  const keys = Object.keys(enumObj);
  const values = keys.map(key => enumObj[key]).filter(v => typeof(v) === 'number');
  return values;
}

notesRouter.use(ensureAuthenticated);

notesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      tag_id: Joi.string().uuid(),
      query: Joi.string().allow(''),
      status: Joi.number().valid(...getEnumValues(NoteStatus)).required(),
      page: Joi.number().min(1).default(1),
    },
  }),
  notesController.index,
);

notesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().max(255).allow(''),
      body: Joi.string().max(65000).required(),
      color: Joi.number().valid(...getEnumValues(NoteColors)).required(),
      tag_id: Joi.string().uuid().allow(''),
    },
  }),
  notesController.create,
);

notesRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().max(255).allow(''),
      body: Joi.string().max(65000),
      color: Joi.number().valid(...getEnumValues(NoteColors)),
      tag_id: Joi.string().uuid().allow(''),
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
