import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import UpdateTagService from './UpdateTagService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeTagsRepository: FakeTagsRepository;
let updateTag: UpdateTagService;

describe('UpdateTag', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTagsRepository = new FakeTagsRepository();
    updateTag = new UpdateTagService(
      fakeTagsRepository,
    );
  });

  it('should be able to update tag', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const tag = await fakeTagsRepository.create({
      user_id: user.id,
      name: 'Name'
    });

    const updatedTag = await updateTag.execute({
      user_id: user.id,
      id: tag.id,
      name: 'New name',
    });

    expect(updatedTag.id).toBe(tag.id);
    expect(updatedTag.name).toBe('New name');
  });

  it("should be able to 'update' tag", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const tag = await fakeTagsRepository.create({
      user_id: user.id,
      name: 'Name'
    });

    const updatedTag = await updateTag.execute({
      user_id: user.id,
      id: tag.id,
    });

    expect(updatedTag.id).toBe(tag.id);
    expect(updatedTag.name).toBe(tag.name);
  });

  it('should not be able to update tag for non-existing user', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const tag = await fakeTagsRepository.create({
      user_id: user.id,
      name: 'Name',
    });

    await expect(
      updateTag.execute({
        user_id: 'non-existing-user-id',
        id: tag.id,
        name: 'New name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update non-existing tag', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    await expect(
      updateTag.execute({
        user_id: user.id,
        id: 'non-existing-tag-id',
        name: 'New name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update another user's tag", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const anotherUser = await fakeUsersRepository.create({
      email: 'anotheruser@email.com',
      password: '123456'
    });

    const anotherUsertag = await fakeTagsRepository.create({
      user_id: anotherUser.id,
      name: 'Name',
    });

    await expect(
      updateTag.execute({
        user_id: user.id,
        id: anotherUsertag.id,
        name: 'New name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
