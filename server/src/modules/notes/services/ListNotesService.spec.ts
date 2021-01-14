import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import ListNotesService from './ListNotesService';
import NoteColors from '../dtos/NoteColors';
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
      status: NoteStatus.ARCHIVED, // !!!
    });

    await fakeNotesRepository.create({
      user_id: 'another-user-id', // !!!
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    const { data: notes, count } = await listNotes.execute({
      user_id: user.id,
      status: NoteStatus.ACTIVE,
      page: 1,
    });

    expect(count).toEqual(2);
    expect(notes[0].status).toEqual(NoteStatus.ACTIVE);
    expect(notes[1].status).toEqual(NoteStatus.ACTIVE);
    expect(notes[0].user_id).toEqual(user.id);
    expect(notes[1].user_id).toEqual(user.id);
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
      status: NoteStatus.ACTIVE, // !!!
    });

    await fakeNotesRepository.create({
      user_id: 'another-user-id', // !!!
      title: 'Title',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ARCHIVED,
    });

    const { data: notes, count } = await listNotes.execute({
      user_id: user.id,
      status: NoteStatus.ARCHIVED,
      page: 1,
    });

    expect(count).toEqual(2);
    expect(notes[0].status).toEqual(NoteStatus.ARCHIVED);
    expect(notes[1].status).toEqual(NoteStatus.ARCHIVED);
    expect(notes[0].user_id).toEqual(user.id);
    expect(notes[1].user_id).toEqual(user.id);
  });

  it("should be able to list user's active notes by tag and query", async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      password: '123456'
    })

    // This is the one that will be retrieved
    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title 1',
      body: 'Body 1',
      tag_id: 'tag_id_1',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title 1',
      body: 'Body',
      tag_id: 'tag_id_2',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title 1',
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ARCHIVED, // !!!
    });

    await fakeNotesRepository.create({
      user_id: user.id,
      title: 'Title 2', // !!!
      body: 'Body',
      color: NoteColors.NoColor,
      status: NoteStatus.ACTIVE,
    });

    const { data: notes, count } = await listNotes.execute({
      user_id: user.id,
      status: NoteStatus.ACTIVE,
      tag_id: 'tag_id_1',
      query: 'Title 1',
      page: 1,
    });

    expect(count).toEqual(1);
    expect(notes[0].status).toEqual(NoteStatus.ACTIVE);
    expect(notes[0].title).toEqual('Title 1');
    expect(notes[0].body).toEqual('Body 1');
  });
});
