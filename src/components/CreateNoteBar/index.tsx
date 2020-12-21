/* eslint-disable no-param-reassign */
import React, { useCallback, useState } from 'react';

import { Container, Options } from './styles';

const CreateNoteBar: React.FC = () => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleFocus = useCallback(() => {
    setExpand(true);
  }, []);

  const handleBlur = useCallback(() => {
    // if text -> save note
    // otherwise:
    setExpand(false);
    setTitle('');
    setBody('');
  }, []);

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
