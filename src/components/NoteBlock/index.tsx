/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdColorLens, MdArchive, MdDelete } from 'react-icons/md';
import CircularButton from '../CircularButton';
import convertColor from '../../utils/convertColor';
import getNextColor from '../../utils/getNextColor';

import { Container, optionIconSize, optionContainerSize } from './styles';

interface Note {
  id: number;
  title: string;
  body: string;
  color: number;
}

interface NoteBlockProps {
  note: Note;
  onUpdateNoteColor(id: number, color: number): void;
  onOpenNote?: (note: Note) => void;
  onCloseAndSaveNote?: (note: Note) => void;
  onArchiveNote?: (note: Note) => void;
  onDeleteNote?: (note: Note) => void;
  isModal?: boolean;
}

const NoteBlock: React.FC<NoteBlockProps> = ({
  note: inputNote,
  onUpdateNoteColor,
  onOpenNote = () => {},
  onCloseAndSaveNote = () => {},
  onArchiveNote = () => {},
  onDeleteNote = () => {},
  isModal = false,
}) => {
  const [note, setNote] = useState({} as Note);

  useEffect(() => {
    setNote(inputNote);
  }, [inputNote]);

  const noteColor = useMemo(() => convertColor(note.color), [note.color]);

  const handleInputTitle = useCallback(
    e => {
      const updatedNote = { ...note };
      updatedNote.title = e.currentTarget.innerText;
      setNote(updatedNote);
    },
    [note],
  );

  const handleInputBody = useCallback(
    e => {
      const updatedNote = { ...note };
      updatedNote.body = e.currentTarget.innerText;
      setNote(updatedNote);
    },
    [note],
  );

  const handleUpdateColor = useCallback(() => {
    const newColor = getNextColor(note.color);
    onUpdateNoteColor(note.id, newColor);
  }, [note.color, note.id, onUpdateNoteColor]);

  const handleArchiveNote = useCallback(
    (noteToArchive: Note) => {
      onArchiveNote(noteToArchive);
    },
    [onArchiveNote],
  );

  const handleDeleteNote = useCallback(
    (noteToDelete: Note) => {
      onDeleteNote(noteToDelete);
    },
    [onDeleteNote],
  );

  return (
    <Container
      noteColor={noteColor}
      bodySize={note.body ? note.body.length : 0}
      isModal={isModal}
    >
      <div id="note" onClick={() => onOpenNote(note)}>
        <strong contentEditable={isModal} onInput={e => handleInputTitle(e)}>
          {inputNote.title}
        </strong>
        <span contentEditable={isModal} onInput={e => handleInputBody(e)}>
          {inputNote.body}
        </span>
      </div>
      <div id="options">
        <CircularButton
          icon={MdColorLens}
          iconSize={optionIconSize}
          containerSize={optionContainerSize}
          onClick={handleUpdateColor}
        />
        <CircularButton
          icon={MdArchive}
          iconSize={optionIconSize}
          containerSize={optionContainerSize}
          onClick={() => handleArchiveNote(note)}
        />
        <CircularButton
          icon={MdDelete}
          iconSize={optionIconSize}
          containerSize={optionContainerSize}
          onClick={() => handleDeleteNote(note)}
        />
        <button
          id="close"
          type="button"
          onClick={() => onCloseAndSaveNote(note)}
        >
          Fechar
        </button>
      </div>
    </Container>
  );
};

export default NoteBlock;
