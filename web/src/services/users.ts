import { AxiosInstance } from 'axios';
import baseAPI from './api';

interface User {
  id: string;
}

interface SignupReq {
  user: {
    email: string;
    password: string;
  };
}

interface SignupRes {
  token: string;
}

interface LoginReq {
  email: string;
  password: string;
}

interface LoginRes {
  user: User;
  token: string;
}

class UsersService {
  api: AxiosInstance;

  constructor() {
    this.api = baseAPI('http://localhost:3333');
  }

  async signup({ user }: SignupReq): Promise<SignupRes> {
    const { data } = await this.api.post<SignupRes>('users', user);
    return data;
  }

  async login({ email, password }: LoginReq): Promise<LoginRes> {
    const { data } = await this.api.post('users/login', {
      email,
      password,
    });
    return data;
  }
}

export default UsersService;
