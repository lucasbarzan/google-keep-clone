/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useMemo, useState } from 'react';
import { MdColorLens, MdArchive, MdDelete } from 'react-icons/md';
import CircularButton from '../CircularButton';
import { useNotes } from '../../hooks/notes';
import convertColor from '../../utils/convertColor';
import getNextColor from '../../utils/getNextColor';

import { Container, optionIconSize, optionContainerSize } from './styles';

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

interface NoteBlockProps {
  note: Note;
  onOpenNote?: (note: Note) => void;
  onCloseNote?: () => void;
  isModal?: boolean;
}

const NoteBlock: React.FC<NoteBlockProps> = ({
  note: inputNote,
  onOpenNote = () => {},
  onCloseNote = () => {},
  isModal = false,
}) => {
  const [note, setNote] = useState(inputNote);

  const { updateNote, updateNoteColor, removeNote } = useNotes();

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

  const handleUpdateNoteColor = useCallback(() => {
    const newColor = getNextColor(note.color);
    updateNoteColor(note.id, newColor);
  }, [note.color, note.id, updateNoteColor]);

  const handleArchiveNote = useCallback(
    (noteToArchive: Note) => {
      // Archive note
      removeNote(noteToArchive.id);

      // Close modal (if open)
      onCloseNote();
    },
    [onCloseNote, removeNote],
  );

  const handleDeleteNote = useCallback(
    (noteToDelete: Note) => {
      // Delete note
      removeNote(noteToDelete.id);

      // Close modal (if open)
      onCloseNote();
    },
    [onCloseNote, removeNote],
  );

  const handleSaveAndCloseNote = useCallback(
    (noteToSave: Note) => {
      // Update note
      updateNote(noteToSave);

      // Close modal (if open)
      onCloseNote();
    },
    [onCloseNote, updateNote],
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
          onClick={handleUpdateNoteColor}
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
          onClick={() => handleSaveAndCloseNote(note)}
        >
          Fechar
        </button>
      </div>
    </Container>
  );
};

export default NoteBlock;
