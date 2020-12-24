import React, {
  useState,
  useCallback,
  InputHTMLAttributes,
  ChangeEvent,
  useMemo,
} from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
import { useNotes } from '../../hooks/notes';

import CircularButton from '../CircularButton';
import { Container } from './styles';

const SearchBar: React.FC<InputHTMLAttributes<HTMLInputElement>> = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [hasFocusedBefore, setHasFocusedBefore] = useState(false);

  const { getNotes, setNotes } = useNotes();

  const notes = useMemo(() => getNotes(), [getNotes]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    setHasFocusedBefore(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleSearch = useCallback(
    (queryOptional?: string) => {
      const searchNotes = notes.filter(note => note.title === query);
      setNotes(searchNotes);
    },
    [notes, query, setNotes],
  );

  const handleInputKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        handleSearch();
      }
    },
    [handleSearch],
  );

  const handleClear = useCallback(() => {
    setQuery('');

    handleSearch('');
  }, [handleSearch]);

  return (
    <Container isFocused={isFocused} hasFocusedBefore={hasFocusedBefore}>
      <CircularButton icon={MdSearch} hoverColor="#e3e5e6" containerSize={4} />
      <input
        type="text"
        placeholder="Pesquisar"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
      />
      <CircularButton
        icon={MdClose}
        hoverColor="#e3e5e6"
        containerSize={4}
        visibility={hasFocusedBefore ? 'visible' : 'hidden'}
        onClick={handleClear}
      />
    </Container>
  );
};

export default SearchBar;
