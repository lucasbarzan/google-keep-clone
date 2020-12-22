/* eslint-disable no-param-reassign */
import React, { useCallback, useState } from 'react';

import { Container, Options } from './styles';

interface Note {
  id: number;
  title: string;
  body: string;
  color: number;
}

interface CreateNoteBarProps {
  onAddNote(note: Note): void;
}

const CreateNoteBar: React.FC<CreateNoteBarProps> = ({ onAddNote }) => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleFocus = useCallback(() => {
    setExpand(true);
  }, []);

  const handleBlur = useCallback(() => {
    if (title || body) {
      onAddNote({ id: 0, color: 0, title, body });
    } else {
      setExpand(false);
    }
    setTitle('');
    setBody('');
  }, [onAddNote, body, title]);

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
        style={{ resize: 'vertical', overflow: 'auto' }}
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
