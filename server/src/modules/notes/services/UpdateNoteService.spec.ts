import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import UpdateNoteService from './UpdateNoteService';
import NoteColors from '../dtos/NoteColors';
import NoteStatus from '../dtos/NoteStatus';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeTagsRepository: FakeTagsRepository;
let fakeNotesRepository: FakeNotesRepository;
let updateNote: UpdateNoteService;

describe('UpdateNote', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTagsRepository = new FakeTagsRepository();
    fakeNotesRepository = new FakeNotesRepository();
    updateNote = new UpdateNoteService(
      fakeTagsRepository,
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

    const newTag = await fakeTagsRepository.create({
      user_id: user.id,
      name: 'Tag name',
    });

    const updatedNote = await updateNote.execute({
      user_id: user.id,
      id: note.id,
      title: 'New Title',
      body: 'New Body',
      color: NoteColors.Pink,
      tag_id: newTag.id,
    });

    expect(updatedNote.id).toBe(note.id);
    expect(updatedNote.status).toBe(note.status);
    expect(updatedNote.user_id).toBe(user.id);
    expect(updatedNote.title).toBe('New Title');
    expect(updatedNote.body).toBe('New Body');
    expect(updatedNote.color).toBe(NoteColors.Pink);
    expect(updatedNote.tag_id).toBe(newTag.id);
  });

  it("should be able to update note's title", async () => {
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
    });

    expect(updatedNote.id).toBe(note.id);
    expect(updatedNote.status).toBe(note.status);
    expect(updatedNote.user_id).toBe(user.id);
    expect(updatedNote.title).toBe('New Title');
    expect(updatedNote.body).toBe(note.body);
    expect(updatedNote.color).toBe(note.color);
    expect(updatedNote.tag_id).toBe(note.tag_id);
  });

  it("should be able to update note's body", async () => {
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
      body: 'New Body',
    });

    expect(updatedNote.id).toBe(note.id);
    expect(updatedNote.status).toBe(note.status);
    expect(updatedNote.user_id).toBe(user.id);
    expect(updatedNote.title).toBe(note.title);
    expect(updatedNote.body).toBe('New Body');
    expect(updatedNote.color).toBe(note.color);
    expect(updatedNote.tag_id).toBe(note.tag_id);
  });

  it("should be able to update note's color", async () => {
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
      color: NoteColors.Pink,
    });

    expect(updatedNote.id).toBe(note.id);
    expect(updatedNote.status).toBe(note.status);
    expect(updatedNote.user_id).toBe(user.id);
    expect(updatedNote.title).toBe(note.title);
    expect(updatedNote.body).toBe(note.body);
    expect(updatedNote.color).toBe(NoteColors.Pink);
    expect(updatedNote.tag_id).toBe(note.tag_id);
  });

  it("should be able to update note's tag", async () => {
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

    const newTag = await fakeTagsRepository.create({
      user_id: user.id,
      name: 'Tag name',
    });

    const updatedNote = await updateNote.execute({
      user_id: user.id,
      id: note.id,
      tag_id: newTag.id,
    });

    expect(updatedNote.id).toBe(note.id);
    expect(updatedNote.status).toBe(note.status);
    expect(updatedNote.user_id).toBe(user.id);
    expect(updatedNote.title).toBe(note.title);
    expect(updatedNote.body).toBe(note.body);
    expect(updatedNote.color).toBe(note.color);
    expect(updatedNote.tag_id).toBe(newTag.id);
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

  it('should not be able to update note with non-existing tag', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456',
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
        id: note.id,
        user_id: user.id,
        tag_id: 'non-existing-tag-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update note with another user's tag", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456',
    });

    const note = await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
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
      updateNote.execute({
        id: note.id,
        user_id: user.id,
        tag_id: anotherUserTag.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
