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
  addNotes(notes: Note[]): void;
  addNote(note: Note): void;
  updateNote(note: Note): void;
  removeNote(id: string): void;
  getNotesQuery(): string;
  setNotesQuery(query: string): void;
  getNotesCount(): number;
  setNotesCount(count: number): void;
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

  const setNotes = useCallback((notes: Note[]) => {
    setAllNotes(notes);
  }, []);

  const addNotes = useCallback(
    (notes: Note[]) => {
      setAllNotes([...allNotes, ...notes]);
    },
    [allNotes],
  );

  const addNote = useCallback((note: Note) => {
    setAllNotes(state => [note, ...state]);
  }, []);

  const removeNote = useCallback((id: string) => {
    setAllNotes(state => state.filter(note => note.id !== id));
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

  const setNotesCount = useCallback((notesCount: number) => {
    setCount(notesCount);
  }, []);

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
        setNotesCount,
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
