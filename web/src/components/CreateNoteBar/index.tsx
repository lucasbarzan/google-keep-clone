/* eslint-disable no-param-reassign */
import React, { useCallback, useMemo, useState } from 'react';
import { MdClose, MdColorLens, MdLabel } from 'react-icons/md';
import { useNotes } from '../../hooks/notes';
import { useTags } from '../../hooks/tags';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import convertColor from '../../utils/convertColor';
import getNextColor from '../../utils/getNextColor';
import CircularButton from '../CircularButton';

import {
  Container,
  TagOptions,
  tagOptionIconSize,
  tagOptionContainerSize,
  Options,
  optionIconSize,
  optionContainerSize,
} from './styles';

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

const CreateNoteBar: React.FC = () => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [color, setColor] = useState(0);
  const [tag, setTag] = useState<Tag>({} as Tag);

  const { addToast } = useToast();
  const { addNote } = useNotes();
  const { getTags } = useTags();

  const tags = useMemo(() => getTags(), [getTags]);

  const handleUpdateNoteColor = useCallback(async () => {
    const newColor = getNextColor(color);

    setColor(newColor);
  }, [color]);

  const handleChangeTag = useCallback(async () => {
    const lastIndex = tags.findIndex(t => t.id === tag?.id);
    if (lastIndex === -1) {
      setTag(tags[0]);
    } else {
      const newIndex = (lastIndex + 1) % tags.length;
      setTag(tags[newIndex]);
    }
  }, [tag?.id, tags]);

  const handleRemoveTag = useCallback(async () => {
    setTag({} as Tag);
  }, []);

  const handleAddNote = useCallback(
    async (noteToAdd: Omit<Note, 'id' | 'color' | 'tag'>) => {
      try {
        const response = await api.createNote({
          title: noteToAdd.title,
          body: noteToAdd.body,
          color,
          tag_id: tag?.id,
        });

        const addedNote = {
          ...response.data,
          tag,
        };

        addNote(addedNote);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar nota',
        });
      } finally {
        setColor(0);
      }
    },
    [addNote, addToast, color, tag],
  );

  const handleFocus = useCallback(() => {
    setExpand(true);
  }, []);

  const handleClose = useCallback(() => {
    if (title || body) {
      handleAddNote({ title, body });
    }

    setExpand(false);
    setTitle('');
    setBody('');
    setColor(0);
    setTag({} as Tag);
  }, [handleAddNote, body, title]);

  return (
    <Container expand={expand} color={convertColor(color)}>
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
      <TagOptions expand={!!tag?.name}>
        <span>{tag?.name}</span>
        <CircularButton
          icon={MdClose}
          iconSize={tagOptionIconSize}
          containerSize={tagOptionContainerSize}
          onClick={handleRemoveTag}
          style={{ display: tag?.name ? 'flex' : 'none' }}
        />
      </TagOptions>
      <Options expand={expand}>
        <CircularButton
          icon={MdLabel}
          iconSize={optionIconSize}
          containerSize={optionContainerSize}
          onClick={handleChangeTag}
          style={{ display: expand && tags.length > 0 ? 'flex' : 'none' }}
        />
        <CircularButton
          icon={MdColorLens}
          iconSize={optionIconSize}
          containerSize={optionContainerSize}
          onClick={handleUpdateNoteColor}
          style={{ display: expand ? 'flex' : 'none' }}
        />
        <button id="close-button" type="button" onClick={handleClose}>
          Fechar
        </button>
      </Options>
    </Container>
  );
};

export default CreateNoteBar;
