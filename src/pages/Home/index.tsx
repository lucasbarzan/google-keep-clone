import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
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
  tag?: {
    id: string;
    name: string;
  };
}

interface HomeParams {
  id: string;
}

const Home: React.FC = () => {
  // const [notes, setNotes] = useState<Note[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openedNote, setOpenedNote] = useState({} as Note);
  Modal.setAppElement('#root');

  const { setTags } = useSidebar();
  const { getNotes, setNotes } = useNotes();

  const { id: tagId } = useParams<HomeParams>();

  useEffect(() => {
    setNotes(
      [
        {
          id: '1',
          title: 'title 1',
          body: 'body 1',
          color: 0,
          tag: { id: '1', name: 'tag 1' },
        },
        {
          id: '2',
          title: 'title 2',
          body: 'body 2',
          color: 2,
          tag: { id: '1', name: 'tag 1' },
        },
        {
          id: '3',
          title: 'title 3',
          body: 'body 3',
          color: 0,
          tag: { id: '2', name: 'tag 2' },
        },
        {
          id: '4',
          title: 'title 4',
          body: 'body 4',
          color: 4,
          tag: { id: '2', name: 'tag 2' },
        },
        {
          id: '5',
          title: 'title 5',
          body: 'body 5',
          color: 0,
          tag: { id: '3', name: 'tag 3' },
        },
      ].filter(n => (tagId ? n.tag.id === tagId : true)),
    );

    setTags([
      { id: '1', name: 'tag 1' },
      { id: '2', name: 'tag 2' },
      { id: '3', name: 'tag 3' },
    ]);
  }, [setNotes, setTags, tagId]);

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

  const handleOpenNote = useCallback(
    (note: Note) => {
      setOpenedNote(note);
      openModal();
    },
    [openModal],
  );

  const handleCloseNote = useCallback(() => {
    setOpenedNote({} as Note);
    closeModal();
  }, [closeModal]);

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
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
                onOpenNote={handleOpenNote}
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
        <NoteBlock isModal note={openedNote} onCloseNote={handleCloseNote} />
      </Modal>
    </Container>
  );
};

export default Home;
