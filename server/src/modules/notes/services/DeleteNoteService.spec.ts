import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import DeleteNoteService from './DeleteNoteService';
import NoteColors from '../dtos/NoteColors';
import NoteStatus from '../dtos/NoteStatus';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeNotesRepository: FakeNotesRepository;
let deleteNote: DeleteNoteService;

describe('DeleteNote', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeNotesRepository = new FakeNotesRepository();
    deleteNote = new DeleteNoteService(
      fakeNotesRepository,
    );
  });

  it('should be able to delete note', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const note = await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    await expect(deleteNote.execute({
      user_id: user.id,
      id: note.id,
    })).resolves.not.toThrow();
  });

  it('should not be able to delete non-existing note', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    await expect(deleteNote.execute({
      user_id: user.id,
      id: 'non-existing-note-id',
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to delete another user's note", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const anotherUser = await fakeUsersRepository.create({
      email: 'anotheruser@email.com',
      password: '123456'
    });

    const anotherUserNote = await fakeNotesRepository.create({
      user_id: anotherUser.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    await expect(
      deleteNote.execute({
        user_id: user.id,
        id: anotherUserNote.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
