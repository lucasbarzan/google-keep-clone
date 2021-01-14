import Note from '../infra/typeorm/entities/Note';

export default interface IFindAllNotesResponseDTO {
  data: Note[];
  count: number;
}
