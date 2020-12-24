import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePasswordService from '@modules/users/services/UpdatePasswordService';
import { classToClass } from 'class-transformer';

export default class PasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { old_password, password } = request.body;

    const updatePassword = container.resolve(UpdatePasswordService);

    const user = await updatePassword.execute({
      user_id,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }
}
