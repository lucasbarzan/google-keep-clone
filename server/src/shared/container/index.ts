import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import NotesRepository from '@modules/notes/infra/typeorm/repositories/NotesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<INotesRepository>(
  'NotesRepository',
  NotesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
