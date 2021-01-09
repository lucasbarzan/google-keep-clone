import axios, { AxiosInstance } from 'axios';

export const baseAPI = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
  });
  return api;
};

/// /////////// MODELS /////////// ///

interface User {
  id: string;
  email: string;
  password: string;
}

interface Tag {
  id: string;
  user_id: string;
  name: string;
}

interface Note {
  id: string;
  title: string;
  body: string;
  color: number;
  status: number;
  tag?: Tag;
}

/// /////////// USERS Requests /////////// ///

interface CreateUserReq {
  email: string;
  password: string;
}

interface LoginReq {
  email: string;
  password: string;
}

interface ForgotUserPasswordReq {
  email: string;
}

interface ResetUserPasswordReq {
  old_password: string;
  password: string;
  password_confirmation: string;
}

/// /////////// NOTES Requests /////////// ///

interface GetAllNotesReq {
  tagId?: string;
  query?: string;
  status: number;
}

interface CreateNoteReq {
  title?: string;
  body: string;
  color: number;
  tag_id?: string;
}

interface UpdateNoteReq {
  id: string;
  title?: string;
  body?: string;
  color?: number;
  tag_id?: string;
}

interface ArchiveNoteReq {
  id: string;
}

interface UnarchiveNoteReq {
  id: string;
}

interface DeleteNoteReq {
  id: string;
}

/// /////////// TAGS Requests /////////// ///

interface CreateTagReq {
  name: string;
}

interface UpdateTagReq {
  id: string;
  name?: string;
}

interface DeleteTagReq {
  id: string;
}

/// ////////////////////////////////  ///// ///

export default class API {
  api: AxiosInstance;

  constructor() {
    this.api = baseAPI('http://localhost:3333');
  }

  /// /////////// USERS Endpoints /////////// ///

  async createUser(body: CreateUserReq): Promise<Omit<User, 'password'>> {
    const { data } = await this.api.post<Omit<User, 'password'>>('users', body);
    return data;
  }

  async login(body: LoginReq): Promise<User> {
    const { data } = await this.api.post<User>('sessions', body);
    return data;
  }

  async forgotUserPassword(body: ForgotUserPasswordReq): Promise<void> {
    await this.api.post<void>('password/forgot', body);
  }

  async resetUserPassword(body: ResetUserPasswordReq): Promise<void> {
    await this.api.post<void>('password/reset', body);
  }

  /// /////////// NOTES Endpoints /////////// ///

  async getAllNotes({ tagId, query }: GetAllNotesReq): Promise<Note[]> {
    const { data } = await this.api.get<Note[]>('notes', {
      params: {
        tag: tagId,
        query,
      },
    });
    return data;
  }

  async createNote(body: CreateNoteReq): Promise<Note> {
    const { data } = await this.api.post<Note>('notes', body);
    return data;
  }

  async updateNote({ id, ...body }: UpdateNoteReq): Promise<Note> {
    const { data } = await this.api.patch<Note>(`notes/${id}`, body);
    return data;
  }

  async archiveNote({ id }: ArchiveNoteReq): Promise<Note> {
    const { data } = await this.api.post<Note>(`notes/archive/${id}`);
    return data;
  }

  async unarchiveNote({ id }: UnarchiveNoteReq): Promise<Note> {
    const { data } = await this.api.delete<Note>(`notes/archive/${id}`);
    return data;
  }

  async deleteNote({ id }: DeleteNoteReq): Promise<void> {
    await this.api.delete<void>(`notes/${id}`);
  }

  /// /////////// TAGS Endpoints /////////// ///

  async getAllTags(): Promise<Tag[]> {
    const { data } = await this.api.get<Tag[]>('tags');
    return data;
  }

  async createTag(body: CreateTagReq): Promise<Tag> {
    const { data } = await this.api.post<Tag>('tags', body);
    return data;
  }

  async updateTag({ id, ...body }: UpdateTagReq): Promise<Tag> {
    const { data } = await this.api.patch<Tag>(`tags/${id}`, body);
    return data;
  }

  async deleteTag({ id }: DeleteTagReq): Promise<void> {
    await this.api.delete<void>(`tags/${id}`);
  }
}
