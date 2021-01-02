import AppError from '@shared/errors/AppError';
import NoteColors from '../dtos/NoteColors';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateNoteService from './UpdateNoteService';
import NoteStatus from '../dtos/NoteStatus';

let fakeUsersRepository: FakeUsersRepository;
let fakeNotesRepository: FakeNotesRepository;
let updateNote: UpdateNoteService;

describe('UpdateNote', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeNotesRepository = new FakeNotesRepository();
    updateNote = new UpdateNoteService(
      fakeNotesRepository,
    );
  });

  it('should be able to update note', async () => {
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

    const updatedNote = await updateNote.execute({
      user_id: user.id,
      id: note.id,
      title: 'New Title',
      body: 'New Body',
      color: NoteColors.Pink,
    });

    expect(updatedNote.id).toBe(note.id);
    expect(updatedNote.status).toBe(note.status);
    expect(updatedNote.user_id).toBe(user.id);
    expect(updatedNote.title).toBe('New Title');
    expect(updatedNote.body).toBe('New Body');
    expect(updatedNote.color).toBe(NoteColors.Pink);
  });

  it('should not be able to update note for non-existing user', async () => {
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

    await expect(
      updateNote.execute({
        user_id: 'non-existing-user-id',
        id: note.id,
        title: 'Title',
        body: 'Body',
        color: NoteColors.NoColor,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update non-existing note', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    await expect(
      updateNote.execute({
        user_id: user.id,
        id: 'non-existing-note-id',
        title: 'Title',
        body: 'Body',
        color: NoteColors.NoColor,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update another user's note", async () => {
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
      updateNote.execute({
        user_id: user.id,
        id: anotherUserNote.id,
        title: 'Title',
        body: 'Body',
        color: NoteColors.NoColor,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
