import NoteColors from "./NoteColors";
import NoteStatus from "./NoteStatus";

export default interface ICreateNoteDTO {
  user_id: string;
  title: string;
  body: string;
  color: NoteColors;
  tag_id?: string;
  status: NoteStatus;
}
