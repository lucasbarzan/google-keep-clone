/* eslint-disable no-param-reassign */
import React, { useCallback, useState } from 'react';
import { useNotes } from '../../hooks/notes';

import { Container, Options } from './styles';

interface Note {
  id: string;
  title: string;
  body: string;
  color: number;
}

const CreateNoteBar: React.FC = () => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { addNote } = useNotes();

  const handleAddNote = useCallback(
    (note: Omit<Note, 'id' | 'color'>) => {
      addNote({ ...note, color: 0, id: '0' });
    },
    [addNote],
  );

  const handleFocus = useCallback(() => {
    setExpand(true);
  }, []);

  const handleBlur = useCallback(() => {
    if (title || body) {
      handleAddNote({ title, body });
    } else {
      setExpand(false);
    }
    setTitle('');
    setBody('');
  }, [handleAddNote, body, title]);

  return (
    <Container expand={expand}>
      <input
        id="note-title"
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onFocus={handleFocus}
      />
      <textarea
        id="note-body"
        placeholder="Criar uma nota..."
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={1}
        onFocus={handleFocus}
      />
      <Options expand={expand}>
        <button type="button" onClick={handleBlur}>
          Fechar
        </button>
      </Options>
    </Container>
  );
};

export default CreateNoteBar;
