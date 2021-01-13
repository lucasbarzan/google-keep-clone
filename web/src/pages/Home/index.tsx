import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useParams } from 'react-router-dom';
import { MdLabelOutline } from 'react-icons/md';
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
  NoNotes,
  modalStyle,
} from './styles';
import { useTags } from '../../hooks/tags';
import { useNotes } from '../../hooks/notes';
import api from '../../services/api';
import NoteStatus from '../../utils/NoteStatus';
import { useToast } from '../../hooks/toast';

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

  const { addToast } = useToast();
  const { setTags, selectTag } = useTags();
  const { getNotes, setNotes } = useNotes();

  const { id: tagId } = useParams<HomeParams>();
  const { pathname } = useLocation();

  // To know in which page we are
  const isArchive = pathname === 'archive';
  const isTag = !!tagId;

  useEffect(() => {
    const func = async () => {
      try {
        const { data: tags } = await api.getAllTags();
        setTags(tags);

        if (isArchive) {
          // Archive page
          selectTag('archive');

          const { data: archivedNotes } = await api.getAllNotes({
            status: NoteStatus.ARCHIVED,
          });
          setNotes(archivedNotes);
        } else if (isTag) {
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
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao acessar suas notas',
          description:
            'Verifique a conexão com a internet e recarregue a página.',
        });
      }
    };

    func();
  }, [
    addToast,
    isArchive,
    isTag,
    pathname,
    selectTag,
    setNotes,
    setTags,
    tagId,
  ]);

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
            {notes.length > 0 ? (
              notes.map(note => (
                <NoteBlock
                  key={note.id}
                  note={note}
                  isArchive={isArchive}
                  onOpenNote={handleOpenNote}
                />
              ))
            ) : (
              <NoNotes>
                <MdLabelOutline size="12rem" />
                <span>
                  {isTag
                    ? 'Não há notas com este marcador ainda'
                    : 'Não há notas ainda'}
                </span>
              </NoNotes>
            )}
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
        <NoteBlock
          note={openedNote}
          isModal
          isArchive={isArchive}
          onCloseNote={handleCloseNote}
        />
      </Modal>
    </Container>
  );
};

export default Home;
