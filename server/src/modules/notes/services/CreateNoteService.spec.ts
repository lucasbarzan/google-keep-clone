import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import CreateNoteService from './CreateNoteService';
import NoteColors from '../dtos/NoteColors';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeTagsRepository: FakeTagsRepository;
let fakeNotesRepository: FakeNotesRepository;
let createNote: CreateNoteService;

describe('CreateNote', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTagsRepository = new FakeTagsRepository();
    fakeNotesRepository = new FakeNotesRepository();
    createNote = new CreateNoteService(
      fakeUsersRepository,
      fakeTagsRepository,
      fakeNotesRepository,
    );
  });

  it('should be able to create note', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456',
    });

    const note = await createNote.execute({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
    });

    expect(note).toHaveProperty('id');
  });

  it('should be able to create note with tag', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456',
    });

    const tag = await fakeTagsRepository.create({
      user_id: user.id,
      name: 'Tag name',
    });

    const note = await createNote.execute({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      tag_id: tag.id,
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

  it('should not be able to create note with non-existing tag', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456',
    });

    await expect(
      createNote.execute({
        user_id: user.id,
        title: 'Title',
        body: 'Body',
        color: NoteColors.NoColor,
        tag_id: 'non-existing-tag-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create note with another user's tag", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456',
    });

    const anotherUser = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456',
    });

    const anotherUserTag = await fakeTagsRepository.create({
      user_id: anotherUser.id,
      name: 'Tag name',
    });

    await expect(
      createNote.execute({
        user_id: user.id,
        title: 'Title',
        body: 'Body',
        color: NoteColors.NoColor,
        tag_id: anotherUserTag.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
