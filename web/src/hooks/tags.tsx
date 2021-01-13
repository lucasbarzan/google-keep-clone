import React, { createContext, useState, useCallback, useContext } from 'react';
import { useNotes } from './notes';

export interface TagItem {
  id: string;
  name: string;
}

interface TagsContextData {
  getTags(): TagItem[];
  addTag(tag: TagItem): void;
  updateTag(tag: TagItem): void;
  setTags(tags: TagItem[]): void;
  removeTag(id: string): void;
  selectTag(id: string): void;
  isSelected(id: string): boolean;
}

const TagsContext = createContext<TagsContextData>({} as TagsContextData);

const TagsProvider: React.FC = ({ children }) => {
  const [allTags, setAllTags] = useState<TagItem[]>([]);
  const [selectedTagId, setSelectedTagId] = useState('');

  const { getNotes, setNotes } = useNotes();

  const getTags = useCallback((): TagItem[] => {
    return allTags;
  }, [allTags]);

  const setTags = useCallback((tagsToSet: TagItem[]) => {
    setAllTags(tagsToSet);
  }, []);

  const addTag = useCallback((tag: TagItem) => {
    setAllTags(state => [...state, tag]);
  }, []);

  const updateTag = useCallback(
    (tag: TagItem) => {
      const updatedTags = [...allTags];
      const tagIndex = updatedTags.findIndex(tagItem => tagItem.id === tag.id);
      updatedTags[tagIndex] = tag;
      setAllTags(updatedTags);
    },
    [allTags],
  );

  const removeTag = useCallback(
    (id: string) => {
      setAllTags(state => state.filter(tagItem => tagItem.id !== id));

      const notes = getNotes();
      const notesAfterTagRemoval = notes.map(note => {
        if (note.tag?.id === id) {
          return {
            ...note,
            tag: undefined,
          };
        }
        return note;
      });
      setNotes(notesAfterTagRemoval);
    },
    [getNotes, setNotes],
  );

  const selectTag = useCallback((id: string) => {
    setSelectedTagId(id);
  }, []);

  const isSelected = useCallback(
    (id: string): boolean => {
      return id === selectedTagId;
    },
    [selectedTagId],
  );

  return (
    <TagsContext.Provider
      value={{
        getTags,
        setTags,
        addTag,
        updateTag,
        removeTag,
        selectTag,
        isSelected,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

function useTags(): TagsContextData {
  const context = useContext(TagsContext);

  if (!context) {
    throw new Error('useTags must be used within a TagsProvider');
  }

  return context;
}

export { TagsProvider, useTags };
