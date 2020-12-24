import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  old_password: string;
  password: string;
}

@injectable()
class UpdatePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const checkOldPassword = await this.hashProvider.compareHash(
      old_password,
      user.password,
    );

    if (!checkOldPassword) {
      throw new AppError('Old password does not match.');
    }

    user.password = await this.hashProvider.generateHash(password);

    return this.usersRepository.save(user);
  }
}

export default UpdatePasswordService;
