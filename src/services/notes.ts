import { AxiosInstance } from 'axios';
import baseAPI from './api';

interface Note {
  id: string;
  title: string;
  body: string;
  color: number;
  // tags: Tag[];
}

interface GetAllReq {
  tagId: string;
  query: string;
}

interface ArchiveReq {
  id: string;
}

interface DeleteReq {
  id: string;
}

class NotesService {
  api: AxiosInstance;

  constructor() {
    this.api = baseAPI('http://localhost:3333');
  }

  async getAll({ tagId, query }: GetAllReq): Promise<Note[]> {
    const { data } = await this.api.get<Note[]>('notes', {
      params: {
        tag: tagId,
        query,
      },
    });
    return data;
  }

  async archive({ id }: ArchiveReq): Promise<void> {
    await this.api.patch<Note[]>(`notes/${id}`);
  }

  async delete({ id }: DeleteReq): Promise<void> {
    await this.api.delete<Note[]>(`notes/${id}`);
  }
}

export default NotesService;
