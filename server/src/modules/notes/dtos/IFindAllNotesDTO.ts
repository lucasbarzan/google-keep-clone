import NoteStatus from "./NoteStatus";

export default interface ICreateNoteDTO {
  user_id: string;
  tag_id?: string;
  query?: string;
  status: NoteStatus;
  page: number;
}
