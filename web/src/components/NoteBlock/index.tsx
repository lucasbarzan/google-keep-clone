/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useMemo, useState } from 'react';
import {
  MdColorLens,
  MdArchive,
  MdDelete,
  MdLabel,
  MdClose,
} from 'react-icons/md';
import CircularButton from '../CircularButton';
import { useNotes } from '../../hooks/notes';
import convertColor from '../../utils/convertColor';
import getNextColor from '../../utils/getNextColor';

import {
  Container,
  NoteArea,
  TagOptions,
  Options,
  tagOptionIconSize,
  tagOptionContainerSize,
  optionIconSize,
  optionContainerSize,
} from './styles';
import api from '../../services/api';
import { useTags } from '../../hooks/tags';

interface Tag {
  id: string;
  name: string;
}

interface Note {
  id: string;
  title: string;
  body: string;
  color: number;
  tag?: Tag;
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

  const { updateNote, removeNote, archiveNote } = useNotes();
  const { getTags } = useTags();

  const noteColor = useMemo(() => convertColor(note.color), [note.color]);

  const tags = useMemo(() => getTags(), [getTags]);

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

  const handleChangeColor = useCallback(async () => {
    const newColor = getNextColor(note.color);

    // Change color on API
    await api.updateNote({
      id: note.id,
      color: newColor,
    });

    // Change color on hook
    updateNote({
      ...note,
      color: newColor,
    });

    // Change color locally
    setNote({
      ...note,
      color: newColor,
    });
  }, [note, updateNote]);

  const handleChangeTag = useCallback(async () => {
    const lastIndex = tags.findIndex(t => t.id === note.tag?.id);
    const newIndex = (lastIndex + 1) % tags.length;
    const newTag = lastIndex === -1 ? tags[0] : tags[newIndex];

    // Change tag on API
    await api.updateNote({
      id: note.id,
      tag_id: newTag.id,
    });

    // Change tag on hook
    updateNote({
      ...note,
      tag: newTag,
    });

    // Change tag locally
    setNote({
      ...note,
      tag: newTag,
    });
  }, [note, tags, updateNote]);

  const handleRemoveTag = useCallback(async () => {
    // Remove tag on API
    await api.updateNote({
      id: note.id,
      tag_id: null,
    });

    // Remove tag on hook
    updateNote({
      ...note,
      tag: {} as Tag,
    });

    // Remove tag locally
    setNote({
      ...note,
      tag: {} as Tag,
    });
  }, [note, updateNote]);

  const handleArchiveNote = useCallback(async () => {
    // Archive note
    await api.archiveNote({
      id: note.id,
    });

    archiveNote(note.id);

    // Close modal (if open)
    onCloseNote();
  }, [archiveNote, note.id, onCloseNote]);

  const handleDeleteNote = useCallback(async () => {
    // Delete note
    await api.deleteNote({
      id: note.id,
    });

    removeNote(note.id);

    // Close modal (if open)
    onCloseNote();
  }, [note.id, onCloseNote, removeNote]);

  const handleSaveAndCloseNote = useCallback(async () => {
    // Update note
    await api.updateNote({
      id: note.id,
      title: note.title,
      body: note.body,
      color: note.color,
      tag_id: note.tag?.id,
    });
    updateNote(note);

    // Close modal (if open)
    onCloseNote();
  }, [note, onCloseNote, updateNote]);

  return (
    <Container
      noteColor={noteColor}
      bodySize={note.body ? note.body.length : 0}
      isModal={isModal}
    >
      <NoteArea
        bodySize={note.body ? note.body.length : 0}
        isModal={isModal}
        onClick={() => onOpenNote(note)}
      >
        <strong contentEditable={isModal} onInput={e => handleInputTitle(e)}>
          {inputNote.title}
        </strong>
        <span contentEditable={isModal} onInput={e => handleInputBody(e)}>
          {inputNote.body}
        </span>
      </NoteArea>
      <TagOptions expand={!!note.tag?.name}>
        <span>{note.tag?.name}</span>
        <CircularButton
          icon={MdClose}
          iconSize={tagOptionIconSize}
          containerSize={tagOptionContainerSize}
          onClick={handleRemoveTag}
          style={{ display: note.tag?.name ? 'flex' : 'none' }}
        />
      </TagOptions>
      <Options id="options" isModal={isModal}>
        <CircularButton
          icon={MdColorLens}
          iconSize={optionIconSize}
          containerSize={optionContainerSize}
          onClick={handleChangeColor}
        />
        <CircularButton
          icon={MdLabel}
          iconSize={optionIconSize}
          containerSize={optionContainerSize}
          onClick={handleChangeTag}
          style={{ display: tags.length > 0 ? 'flex' : 'none' }}
        />
        <CircularButton
          icon={MdArchive}
          iconSize={optionIconSize}
          containerSize={optionContainerSize}
          onClick={handleArchiveNote}
        />
        <CircularButton
          icon={MdDelete}
          iconSize={optionIconSize}
          containerSize={optionContainerSize}
          onClick={handleDeleteNote}
        />
        <button id="close" type="button" onClick={handleSaveAndCloseNote}>
          Fechar
        </button>
      </Options>
    </Container>
  );
};

export default NoteBlock;
