import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import ListTagsService from './ListTagsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTagsRepository: FakeTagsRepository;
let listTags: ListTagsService;

describe('ListTags', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTagsRepository = new FakeTagsRepository();
    listTags = new ListTagsService(
      fakeTagsRepository,
    );
  });

  it("should be able to list all user's tags", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    })

    await fakeTagsRepository.create({
      user_id: user.id,
      name: 'Tag 1',
    });

    await fakeTagsRepository.create({
      user_id: user.id,
      name: 'Tag 2',
    });

    await fakeTagsRepository.create({
      user_id: 'another-user-id',
      name: 'Tag 3',
    });

    const tags = await listTags.execute({
      user_id: user.id,
    });

    expect(tags.length).toEqual(2);
    expect(tags[0].user_id).toEqual(user.id);
    expect(tags[1].user_id).toEqual(user.id);
  });
});
