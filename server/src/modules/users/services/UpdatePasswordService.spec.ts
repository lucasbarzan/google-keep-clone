// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdatePasswordService from './UpdatePasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updatePassword: UpdatePasswordService;

describe('UpdatePassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updatePassword = new UpdatePasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updatePassword.execute({
      user_id: user.id,
      old_password: '123456',
      password: '654321'
    });

    expect(updatedUser.password).toBe('654321');
  });

  it("should not be able to update a non-existent user's password", async () => {
    await expect(
      updatePassword.execute({
        user_id: 'non-existent-user-id',
        old_password: '123456',
        password: '654321'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
