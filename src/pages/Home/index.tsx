import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import CreateNoteBar from '../../components/CreateNoteBar';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import NoteBlock from '../../components/NoteBlock';

import {
  Container,
  Contents,
  BarAndNotes,
  Bar,
  Notes,
  modalStyle,
} from './styles';

interface Note {
  id: number;
  title: string;
  body: string;
  color: number;
}

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openedNote, setOpenedNote] = useState({} as Note);
  Modal.setAppElement('#root');

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const afterOpenModal = useCallback(() => {
    // subtitle.style.color = '#f00';
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  useEffect(() => {
    setNotes([
      {
        id: 1,
        color: 0,
        title: 'title 1',
        body: 'body body body body body body',
      },
      {
        id: 2,
        color: 1,
        title: 'title 2',
        body: 'body body body body body body',
      },
      {
        id: 3,
        color: 0,
        title: 'title 3',
        body:
          'body body body body body body body body body body body body body body body body body body body body body body body body',
      },
      {
        id: 4,
        color: 0,
        title: 'title 4',
        body: 'body body body body body body',
      },
      {
        id: 5,
        color: 4,
        title: 'title 5',
        body: 'body body body body body body',
      },
    ]);
  }, []);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, [showSidebar]);

  const search = useCallback(
    (query: string) => {
      console.log(query);
      const searchNotes = notes.filter(note => note.title === query);
      setNotes(searchNotes);

      // Close modal
      setOpenedNote({} as Note);
      closeModal();
    },
    [closeModal, notes],
  );

  const addNote = useCallback(
    (note: Note) => {
      setNotes([...notes, note]);
    },
    [notes],
  );

  const updateNoteColor = useCallback(
    (id: number, color: number) => {
      const updatedNotes = [...notes];
      const noteIndex = updatedNotes.findIndex(note => note.id === id);
      updatedNotes[noteIndex].color = color;
      setNotes(updatedNotes);
    },
    [notes],
  );

  const openNote = useCallback(
    (note: Note) => {
      setOpenedNote(note);
      openModal();
    },
    [openModal],
  );

  const closeAndSaveNote = useCallback(
    (note: Note) => {
      // Update note
      const updatedNotes = [...notes];
      const noteIndex = updatedNotes.findIndex(
        noteItem => noteItem.id === note.id,
      );
      updatedNotes[noteIndex] = note;
      setNotes(updatedNotes);

      // Close modal
      setOpenedNote({} as Note);
      closeModal();
    },
    [closeModal, notes],
  );

  const archiveNote = useCallback(
    (note: Note) => {
      // Archive note
      const updatedNotes = [...notes];
      const noteIndex = updatedNotes.findIndex(
        noteItem => noteItem.id === note.id,
      );
      updatedNotes.splice(noteIndex, 1);
      setNotes(updatedNotes);

      // Close modal
      setOpenedNote({} as Note);
      closeModal();
    },
    [closeModal, notes],
  );

  const deleteNote = useCallback(
    (note: Note) => {
      // Delete note
      const updatedNotes = [...notes];
      const noteIndex = updatedNotes.findIndex(
        noteItem => noteItem.id === note.id,
      );
      updatedNotes.splice(noteIndex, 1);
      setNotes(updatedNotes);

      // Close modal
      setOpenedNote({} as Note);
      closeModal();
    },
    [closeModal, notes],
  );

  return (
    <Container>
      <Header onSearch={search} onToggleSidebar={toggleSidebar} />
      <Contents>
        <Sidebar show={showSidebar} />
        <BarAndNotes>
          <Bar>
            <CreateNoteBar onAddNote={addNote} />
          </Bar>
          <Notes>
            {notes.map(note => (
              <NoteBlock
                key={note.id}
                note={note}
                onUpdateNoteColor={updateNoteColor}
                onOpenNote={openNote}
                onArchiveNote={archiveNote}
                onDeleteNote={deleteNote}
              />
            ))}
          </Notes>
        </BarAndNotes>
      </Contents>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <NoteBlock
          note={openedNote}
          onUpdateNoteColor={updateNoteColor}
          onCloseAndSaveNote={closeAndSaveNote}
          onArchiveNote={archiveNote}
          onDeleteNote={deleteNote}
          isModal
        />
      </Modal>
    </Container>
  );
};

export default Home;
