import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import UnarchiveNoteService from './UnarchiveNoteService';
import NoteColors from '../dtos/NoteColors';
import NoteStatus from '../dtos/NoteStatus';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeNotesRepository: FakeNotesRepository;
let unarchiveNote: UnarchiveNoteService;

describe('UnarchiveNote', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeNotesRepository = new FakeNotesRepository();
    unarchiveNote = new UnarchiveNoteService(
      fakeNotesRepository,
    );
  });

  it('should be able to unarchive note', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const note = await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ARCHIVED,
    });

    const archivedNote = await unarchiveNote.execute({
      user_id: user.id,
      id: note.id,
    });

    expect(archivedNote.id).toBe(note.id);
    expect(archivedNote.status).toBe(NoteStatus.ACTIVE);
  });

  it('should not be able to unarchive non-existing note', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    await expect(unarchiveNote.execute({
      user_id: user.id,
      id: 'non-existing-note-id',
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to unarchive another user's note", async () => {
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
      unarchiveNote.execute({
        user_id: user.id,
        id: anotherUserNote.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
