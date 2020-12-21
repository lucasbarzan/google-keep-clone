import React, { useCallback, useEffect, useState } from 'react';
import CreateNoteBar from '../../components/CreateNoteBar';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Note from '../../components/Note';

import { Container, Contents } from './styles';

interface NoteObj {
  id: number;
  title: string;
  body: string;
}

const Home: React.FC = () => {
  const [notes, setNotes] = useState<NoteObj[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setNotes([
      { id: 1, title: 'title 1', body: 'body body body body body body' },
      { id: 2, title: 'title 2', body: 'body body body body body body' },
      {
        id: 3,
        title: 'title 3',
        body:
          'body body body body body body body body body body body body body body body body body body body body body body body body',
      },
      { id: 4, title: 'title 4', body: 'body body body body body body' },
      { id: 5, title: 'title 5', body: 'body body body body body body' },
    ]);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, [showSidebar]);

  return (
    <Container>
      <Header onToggleSidebar={handleToggleSidebar} />
      <Contents>
        <Sidebar show={showSidebar} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              margin: '3.6rem auto',
            }}
          >
            <CreateNoteBar />
          </div>
          <div
            style={{
              display: 'flex',
              margin: '2.4rem auto',
            }}
          >
            {notes.map(note => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </div>
      </Contents>
    </Container>
  );
};

export default Home;
