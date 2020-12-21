import React from 'react';
import { MdColorLens, MdArchive } from 'react-icons/md';
import CircularButton from '../CircularButton';

import { Container } from './styles';

interface NoteProps {
  note: {
    id: number;
    title: string;
    body: string;
  };
}

const Note: React.FC<NoteProps> = ({ note }) => {
  return (
    <Container bodySize={note.body.length}>
      <div id="note">
        <strong>{note.title}</strong>
        <span>{note.body}</span>
      </div>
      <div id="options">
        <CircularButton
          icon={MdColorLens}
          iconSize={16}
          containerSize={3.2}
          onClick={() => console.log('AQUIII')}
        />
        <CircularButton
          icon={MdArchive}
          iconSize={16}
          containerSize={3.2}
          onClick={() => console.log('AQUIII')}
        />
      </div>
    </Container>
  );
};

export default Note;
