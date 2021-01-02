import AppError from '@shared/errors/AppError';
import NoteColors from '../dtos/NoteColors';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateNoteService from './CreateNoteService';

let fakeUsersRepository: FakeUsersRepository;
let fakeNotesRepository: FakeNotesRepository;
let createNote: CreateNoteService;

describe('CreateNote', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeNotesRepository = new FakeNotesRepository();
    createNote = new CreateNoteService(
      fakeUsersRepository,
      fakeNotesRepository,
    );
  });

  it('should be able to create note', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    });

    const note = await createNote.execute({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
    });

    expect(note).toHaveProperty('id');
  });

  it('should not be able to create note for non-existing user', async () => {
    await expect(
      createNote.execute({
        user_id: 'non-existing-user-id',
        title: 'Title',
        body: 'Body',
        color: NoteColors.NoColor,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
