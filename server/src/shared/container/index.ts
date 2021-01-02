import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import NotesRepository from '@modules/notes/infra/typeorm/repositories/NotesRepository';

import ITagsRepository from '@modules/notes/repositories/ITagsRepository';
import TagsRepository from '@modules/notes/infra/typeorm/repositories/TagsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotesRepository>(
  'NotesRepository',
  NotesRepository,
);

container.registerSingleton<ITagsRepository>(
  'TagsRepository',
  TagsRepository,
);
