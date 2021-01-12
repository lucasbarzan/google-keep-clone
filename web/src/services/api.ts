/* eslint-disable class-methods-use-this */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

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

// /// /////////// Others /////////// ///

interface LoginRes {
  token: string;
  user: User;
}

/// ////////////////////////////////  ///// ///

export default class api {
  static axiosInstance: AxiosInstance = baseAPI('http://localhost:3333');

  /// /////////// USERS Endpoints /////////// ///

  static async createUser(
    body: CreateUserReq,
  ): Promise<AxiosResponse<Omit<User, 'password'>>> {
    const response = await api.axiosInstance.post<Omit<User, 'password'>>(
      'users',
      body,
    );
    return response;
  }

  static async login(body: LoginReq): Promise<AxiosResponse<LoginRes>> {
    const response = await api.axiosInstance.post<LoginRes>('sessions', body);
    return response;
  }

  static async forgotUserPassword(body: ForgotUserPasswordReq): Promise<void> {
    await api.axiosInstance.post<void>('password/forgot', body);
  }

  static async resetUserPassword(body: ResetUserPasswordReq): Promise<void> {
    await api.axiosInstance.post<void>('password/reset', body);
  }

  /// /////////// NOTES Endpoints /////////// ///

  static async getAllNotes({
    tagId,
    query,
    status,
  }: GetAllNotesReq): Promise<AxiosResponse<Note[]>> {
    const response = await api.axiosInstance.get<Note[]>('notes', {
      params: {
        tag: tagId,
        query,
        status,
      },
    });
    return response;
  }

  static async createNote(body: CreateNoteReq): Promise<AxiosResponse<Note>> {
    const response = await api.axiosInstance.post<Note>('notes', body);
    return response;
  }

  static async updateNote({
    id,
    ...body
  }: UpdateNoteReq): Promise<AxiosResponse<Note>> {
    const response = await api.axiosInstance.patch<Note>(`notes/${id}`, body);
    return response;
  }

  static async archiveNote({
    id,
  }: ArchiveNoteReq): Promise<AxiosResponse<Note>> {
    const response = await api.axiosInstance.post<Note>(`notes/archive/${id}`);
    return response;
  }

  static async unarchiveNote({
    id,
  }: UnarchiveNoteReq): Promise<AxiosResponse<Note>> {
    const response = await api.axiosInstance.delete<Note>(
      `notes/archive/${id}`,
    );
    return response;
  }

  static async deleteNote({ id }: DeleteNoteReq): Promise<void> {
    await api.axiosInstance.delete<void>(`notes/${id}`);
  }

  /// /////////// TAGS Endpoints /////////// ///

  static async getAllTags(): Promise<AxiosResponse<Tag[]>> {
    const response = await api.axiosInstance.get<Tag[]>('tags');
    return response;
  }

  static async createTag(body: CreateTagReq): Promise<AxiosResponse<Tag>> {
    const response = await api.axiosInstance.post<Tag>('tags', body);
    return response;
  }

  static async updateTag({
    id,
    ...body
  }: UpdateTagReq): Promise<AxiosResponse<Tag>> {
    const response = await api.axiosInstance.patch<Tag>(`tags/${id}`, body);
    return response;
  }

  static async deleteTag({ id }: DeleteTagReq): Promise<void> {
    await api.axiosInstance.delete<void>(`tags/${id}`);
  }
}
