import { Router } from 'express';

// import notesRouter from '@modules/notes/infra/http/routes/notes.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

// routes.use('/notes', notesRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
