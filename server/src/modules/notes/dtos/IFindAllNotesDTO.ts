import NoteStatus from "./NoteStatus";

export default interface ICreateNoteDTO {
  user_id: string;
  tag?: string;
  query?: string;
  status: NoteStatus;
}
