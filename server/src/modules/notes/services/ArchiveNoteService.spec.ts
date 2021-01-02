import AppError from '@shared/errors/AppError';
import NoteColors from '../dtos/NoteColors';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ArchiveNoteService from './ArchiveNoteService';
import NoteStatus from '../dtos/NoteStatus';

let fakeUsersRepository: FakeUsersRepository;
let fakeNotesRepository: FakeNotesRepository;
let archiveNote: ArchiveNoteService;

describe('ArchiveNote', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeNotesRepository = new FakeNotesRepository();
    archiveNote = new ArchiveNoteService(
      fakeNotesRepository,
    );
  });

  it('should be able to archive note', async () => {
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

    const archivedNote = await archiveNote.execute({
      user_id: user.id,
      id: note.id,
    });

    expect(archivedNote.id).toBe(note.id);
    expect(archivedNote.status).toBe(NoteStatus.ARCHIVED);
  });

  it('should not be able to archive non-existing note', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    await expect(archiveNote.execute({
      user_id: user.id,
      id: 'non-existing-note-id',
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to archive another user's note", async () => {
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
      archiveNote.execute({
        user_id: user.id,
        id: anotherUserNote.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
