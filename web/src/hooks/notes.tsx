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
  setNotes(data: { notes: Note[]; notesCount?: number }): void;
  addNotes(data: { notes: Note[]; notesCount?: number }): void;
  addNote(note: Note): void;
  updateNote(note: Note): void;
  removeNote(id: string): void;
  getNotesQuery(): string;
  setNotesQuery(query: string): void;
  getNotesCount(): number;
  getCurrentPage(): number;
  setCurrentPage(count: number): void;
}

const NotesContext = createContext<NotesContextData>({} as NotesContextData);

const NotesProvider: React.FC = ({ children }) => {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState('');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

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

  const setNotes = useCallback(
    ({ notes, notesCount }: { notes: Note[]; notesCount?: number }) => {
      setAllNotes(notes);
      if (notesCount) setCount(notesCount);
    },
    [],
  );

  const addNotes = useCallback(
    ({ notes, notesCount }: { notes: Note[]; notesCount?: number }) => {
      setAllNotes([...allNotes, ...notes]);
      if (notesCount) setCount(notesCount);
    },
    [allNotes],
  );

  const addNote = useCallback((note: Note) => {
    setAllNotes(state => [note, ...state]);
    setCount(state => state + 1);
  }, []);

  const removeNote = useCallback((id: string) => {
    setAllNotes(state => state.filter(note => note.id !== id));
    setCount(state => state - 1);
  }, []);

  const getNotesQuery = useCallback(() => {
    return query;
  }, [query]);

  const setNotesQuery = useCallback((notesQuery: string) => {
    setQuery(notesQuery);
  }, []);

  const getNotesCount = useCallback(() => {
    return count;
  }, [count]);

  const getCurrentPage = useCallback(() => {
    return page;
  }, [page]);

  const setCurrentPage = useCallback((currentPage: number) => {
    setPage(currentPage);
  }, []);

  return (
    <NotesContext.Provider
      value={{
        getNotes,
        setNotes,
        addNotes,
        addNote,
        updateNote,
        removeNote,
        getNotesQuery,
        setNotesQuery,
        getNotesCount,
        getCurrentPage,
        setCurrentPage,
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
