import NoteColors from '../dtos/NoteColors';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListNotesService from './ListNotesService';
import NoteStatus from '../dtos/NoteStatus';

let fakeUsersRepository: FakeUsersRepository;
let fakeNotesRepository: FakeNotesRepository;
let listNotes: ListNotesService;

describe('ListNotes', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeNotesRepository = new FakeNotesRepository();
    listNotes = new ListNotesService(
      fakeNotesRepository,
    );
  });

  it("should be able to list all active user's notes", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    })

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ARCHIVED,
    });

    const notes = await listNotes.execute({
      user_id: user.id,
      status: NoteStatus.ACTIVE,
    });

    expect(notes.length).toEqual(2);
    expect(notes[0].status).toEqual(NoteStatus.ACTIVE);
    expect(notes[1].status).toEqual(NoteStatus.ACTIVE);
  });

  it("should be able to list all archived user's notes", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    })

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ARCHIVED,
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ARCHIVED,
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    const notes = await listNotes.execute({
      user_id: user.id,
      status: NoteStatus.ARCHIVED,
    });

    expect(notes.length).toEqual(2);
    expect(notes[0].status).toEqual(NoteStatus.ARCHIVED);
    expect(notes[1].status).toEqual(NoteStatus.ARCHIVED);
  });

  it("should be able to list user's active notes by tag and query", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    })

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title 1',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title 1',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title 1',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ARCHIVED,
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title 2',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    const notes = await listNotes.execute({
      user_id: user.id,
      status: NoteStatus.ACTIVE,
      // tag: 'tag-id', // TODO: Change
      query: 'Title 1'
    });

    expect(notes.length).toEqual(2);
    expect(notes[0].status).toEqual(NoteStatus.ACTIVE);
    expect(notes[1].status).toEqual(NoteStatus.ACTIVE);
  });
});
