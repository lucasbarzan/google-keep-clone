import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useParams } from 'react-router-dom';
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
import { useTags } from '../../hooks/tags';
import { useNotes } from '../../hooks/notes';
import api from '../../services/api';
import NoteStatus from '../../utils/NoteStatus';

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
  const [showSidebar, setShowSidebar] = useState(false);
  const [noteModalIsOpen, setNoteModalIsOpen] = useState(false);
  const [openedNote, setOpenedNote] = useState({} as Note);
  Modal.setAppElement('#root');

  const { setTags, selectTag } = useTags();
  const { getNotes, setNotes } = useNotes();

  const { id: tagId } = useParams<HomeParams>();
  const { pathname } = useLocation();

  useEffect(() => {
    const func = async () => {
      const { data: tags } = await api.getAllTags();
      setTags(tags);

      if (pathname === '/archive') {
        // Archive page
        selectTag('archive');

        const { data: archivedNotes } = await api.getAllNotes({
          status: NoteStatus.ARCHIVED,
        });
        setNotes(archivedNotes);
      } else if (tagId) {
        // Tag page
        selectTag(tagId);

        const { data: notes } = await api.getAllNotes({
          tagId,
          status: NoteStatus.ACTIVE,
        });
        setNotes(notes);
      } else {
        // Home page
        selectTag('notes');

        const { data: notes } = await api.getAllNotes({
          status: NoteStatus.ACTIVE,
        });
        setNotes(notes);
      }
    };

    func();
  }, [pathname, selectTag, setNotes, setTags, tagId]);

  const notes = useMemo(() => getNotes(), [getNotes]);

  const openNoteModal = useCallback(() => {
    setNoteModalIsOpen(true);
  }, []);

  const afterOpenNoteModal = useCallback(() => {
    // ...
  }, []);

  const closeNoteModal = useCallback(() => {
    setNoteModalIsOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, [showSidebar]);

  const handleOpenNote = useCallback(
    (note: Note) => {
      setOpenedNote(note);
      openNoteModal();
    },
    [openNoteModal],
  );

  const handleCloseNote = useCallback(() => {
    setOpenedNote({} as Note);
    closeNoteModal();
  }, [closeNoteModal]);

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
        isOpen={noteModalIsOpen}
        onAfterOpen={afterOpenNoteModal}
        onRequestClose={closeNoteModal}
        style={modalStyle}
        contentLabel="Selected note modal"
      >
        <NoteBlock isModal note={openedNote} onCloseNote={handleCloseNote} />
      </Modal>
    </Container>
  );
};

export default Home;
