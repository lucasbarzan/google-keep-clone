import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import CreateTagService from './CreateTagService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeTagsRepository: FakeTagsRepository;
let createTag: CreateTagService;

describe('CreateTag', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTagsRepository = new FakeTagsRepository();
    createTag = new CreateTagService(
      fakeUsersRepository,
      fakeTagsRepository,
    );
  });

  it('should be able to create tag', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const tag = await createTag.execute({
      user_id: user.id,
      name: 'Name'
    });

    expect(tag).toHaveProperty('id');
  });

  it('should not be able to create tag for non-existing user', async () => {
    await expect(
      createTag.execute({
        user_id: 'non-existing-user-id',
        name: 'Name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
