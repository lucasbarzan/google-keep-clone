import React, { createContext, useState, useCallback, useContext } from 'react';

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

interface NotesContextData {
  getNotes(): Note[];
  setNotes(notes: Note[]): void;
  addNote(note: Note): void;
  updateNote(note: Note): void;
  removeNote(id: string): void;
  archiveNote(id: string): void;
}

const NotesContext = createContext<NotesContextData>({} as NotesContextData);

const NotesProvider: React.FC = ({ children }) => {
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  const getNotes = useCallback((): Note[] => {
    return allNotes;
  }, [allNotes]);

  const updateNote = useCallback(
    (note: Note) => {
      const updatedNotes = [...allNotes];
      const noteIndex = updatedNotes.findIndex(
        noteItem => noteItem.id === note.id,
      );
      updatedNotes[noteIndex] = note;
      setAllNotes(updatedNotes);
    },
    [allNotes],
  );

  const setNotes = useCallback((notes: Note[]) => {
    setAllNotes(notes);
  }, []);

  const addNote = useCallback((note: Note) => {
    setAllNotes(state => [note, ...state]);
  }, []);

  const removeNote = useCallback((id: string) => {
    setAllNotes(state => state.filter(note => note.id !== id));
  }, []);

  const archiveNote = useCallback((id: string) => {
    setAllNotes(state => state.filter(note => note.id !== id));
  }, []);

  return (
    <NotesContext.Provider
      value={{
        getNotes,
        setNotes,
        addNote,
        updateNote,
        removeNote,
        archiveNote,
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
