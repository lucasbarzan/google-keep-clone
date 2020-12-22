import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useSidebar } from '../../hooks/sidebar';
import { useNotes } from '../../hooks/notes';

interface Note {
  id: string;
  title: string;
  body: string;
  color: number;
}

const Home: React.FC = () => {
  // const [notes, setNotes] = useState<Note[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openedNote, setOpenedNote] = useState({} as Note);
  Modal.setAppElement('#root');

  const { setTags } = useSidebar();
  const {
    getNotes,
    setNotes,
    updateNoteColor,
    updateNote,
    removeNote,
  } = useNotes();

  useEffect(() => {
    setNotes([
      { id: '1', title: 'title 1', body: 'body 1', color: 0 },
      { id: '2', title: 'title 2', body: 'body 2', color: 2 },
      { id: '3', title: 'title 3', body: 'body 3', color: 0 },
      { id: '4', title: 'title 4', body: 'body 4', color: 4 },
      { id: '5', title: 'title 5', body: 'body 5', color: 0 },
    ]);

    setTags([
      { id: '1', name: 'tag 1' },
      { id: '2', name: 'tag 2' },
      { id: '3', name: 'tag 3' },
    ]);
  }, [setNotes, setTags]);

  const notes = useMemo(() => getNotes(), [getNotes]);

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const afterOpenModal = useCallback(() => {
    // ...
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, [showSidebar]);

  const handleSearch = useCallback(
    (query: string) => {
      const searchNotes = notes.filter(note => note.title === query);
      setNotes(searchNotes);

      // Close modal
      setOpenedNote({} as Note);
      closeModal();
    },
    [closeModal, notes, setNotes],
  );

  const handleUpdateNoteColor = useCallback(
    (id: string, color: number) => {
      updateNoteColor(id, color);
    },
    [updateNoteColor],
  );

  const handleOpenNote = useCallback(
    (note: Note) => {
      setOpenedNote(note);
      openModal();
    },
    [openModal],
  );

  const handleCloseAndSaveNote = useCallback(
    (note: Note) => {
      // Update note
      updateNote(note);

      // Close modal
      setOpenedNote({} as Note);
      closeModal();
    },
    [closeModal, updateNote],
  );

  const handleArchiveNote = useCallback(
    (note: Note) => {
      // Archive note
      removeNote(note.id);

      // Close modal
      setOpenedNote({} as Note);
      closeModal();
    },
    [closeModal, removeNote],
  );

  const deleteNote = useCallback(
    (note: Note) => {
      // Delete note
      removeNote(note.id);

      // Close modal
      setOpenedNote({} as Note);
      closeModal();
    },
    [closeModal, removeNote],
  );

  return (
    <Container>
      <Header onSearch={handleSearch} onToggleSidebar={toggleSidebar} />
      <Contents>
        <Sidebar show={showSidebar} />
        <BarAndNotes>
          <Bar>
            <CreateNoteBar />
          </Bar>
          <Notes>
            {notes.map(note => (
              <NoteBlock
                key={note.id}
                note={note}
                onUpdateNoteColor={handleUpdateNoteColor}
                onOpenNote={handleOpenNote}
                onArchiveNote={handleArchiveNote}
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
          onUpdateNoteColor={handleUpdateNoteColor}
          onCloseAndSaveNote={handleCloseAndSaveNote}
          onArchiveNote={handleArchiveNote}
          onDeleteNote={deleteNote}
          isModal
        />
      </Modal>
    </Container>
  );
};

export default Home;
