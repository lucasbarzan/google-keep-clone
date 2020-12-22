import React, { createContext, useState, useCallback, useContext } from 'react';

export interface NoteItem {
  id: string;
  title: string;
  body: string;
  color: number;
  // tags: Tag[];
}

interface NotesContextData {
  getNotes(): NoteItem[];
  setNotes(notes: NoteItem[]): void;
  addNote(note: NoteItem): void;
  updateNoteColor(id: string, color: number): void;
  updateNote(note: NoteItem): void;
  removeNote(id: string): void;

  // setSearchNotes(notes: NoteItem[]): void;
}

const NotesContext = createContext<NotesContextData>({} as NotesContextData);

const NotesProvider: React.FC = ({ children }) => {
  const [allNotes, setAllNotes] = useState<NoteItem[]>([]);
  // const [filteredNotes, setFilteredNotes] = useState<NoteItem[]>([]);

  // All notes functions

  const getNotes = useCallback((): NoteItem[] => {
    return allNotes;
  }, [allNotes]);

  const updateNoteColor = useCallback(
    (id: string, color: number) => {
      const updatedNotes = [...allNotes];
      const noteIndex = updatedNotes.findIndex(note => note.id === id);
      updatedNotes[noteIndex].color = color;
      setAllNotes(updatedNotes);
    },
    [allNotes],
  );

  const updateNote = useCallback(
    (note: NoteItem) => {
      const updatedNotes = [...allNotes];
      const noteIndex = updatedNotes.findIndex(
        noteItem => noteItem.id === note.id,
      );
      updatedNotes[noteIndex] = note;
      setAllNotes(updatedNotes);
    },
    [allNotes],
  );

  const setNotes = useCallback((notes: NoteItem[]) => {
    setAllNotes(notes);
  }, []);

  const addNote = useCallback((note: NoteItem) => {
    setAllNotes(state => [...state, note]);
  }, []);

  const removeNote = useCallback((id: string) => {
    setAllNotes(state => state.filter(noteItem => noteItem.id !== id));
  }, []);

  // Filtered notes functions

  // const setSearchNotes = useCallback((notes: NoteItem[]) => {
  //   setFilteredNotes(notes);
  // }, []);

  // const getSearchNotes = useCallback((): NoteItem[] => {
  //   return filteredNotes;
  // }, [filteredNotes]);

  return (
    <NotesContext.Provider
      value={{
        getNotes,
        setNotes,
        addNote,
        updateNoteColor,
        updateNote,
        removeNote,
        // getSearchNotes,
        // setSearchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

function useNotes(): NotesContextData {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  return context;
}

export { NotesProvider, useNotes };
