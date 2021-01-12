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
      tag: Joi.string().uuid(),
      query: Joi.string().allow(''),
      status: Joi.number().valid(...getEnumValues(NoteStatus)).required(),
    },
  }),
  notesController.index,
);

notesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().allow('', 'null'),
      body: Joi.string().allow('null').required(),
      color: Joi.number().valid(...getEnumValues(NoteColors)).required(),
      tag_id: Joi.string().allow('', 'null'),
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
      title: Joi.string().allow('', 'null'),
      body: Joi.string(),
      color: Joi.number().valid(...getEnumValues(NoteColors)),
      tag_id: Joi.string().allow('', 'null'),
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
