import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import DeleteTagService from './DeleteTagService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeTagsRepository: FakeTagsRepository;
let deleteTag: DeleteTagService;

describe('DeleteTag', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTagsRepository = new FakeTagsRepository();
    deleteTag = new DeleteTagService(
      fakeTagsRepository,
    );
  });

  it('should be able to delete tag', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const tag = await fakeTagsRepository.create({
      user_id: user.id,
      name: 'Name',
    });

    await expect(deleteTag.execute({
      user_id: user.id,
      id: tag.id,
    })).resolves.not.toThrow();
  });

  it('should not be able to delete non-existing tag', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    await expect(deleteTag.execute({
      user_id: user.id,
      id: 'non-existing-tag-id',
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to delete another user's tag", async () => {
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
      deleteTag.execute({
        user_id: user.id,
        id: anotherUsertag.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
