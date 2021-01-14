import React, {
  useState,
  useCallback,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
import { useNotes } from '../../hooks/notes';
import { useToast } from '../../hooks/toast';

import CircularButton from '../CircularButton';
import { Container } from './styles';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  fetch(options: { isFirstQuery: boolean; query?: string }): void;
}

const SearchBar: React.FC<SearchBarProps> = ({ fetch, ...rest }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);

  const { addToast } = useToast();
  const { setNotesQuery } = useNotes();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    setShowClearButton(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleSearch = useCallback(
    async (options: { isFirstQuery: boolean; query?: string }) => {
      try {
        if (options.query !== undefined) setNotesQuery(options.query);
        fetch(options);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao pesquisar notas',
        });
      }
    },
    [setNotesQuery, fetch, addToast],
  );

  const handleInputKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        handleSearch({ query: inputQuery, isFirstQuery: true });
      }
    },
    [handleSearch, inputQuery],
  );

  const handleClear = useCallback(() => {
    setShowClearButton(false);
    setInputQuery('');

    handleSearch({ query: '', isFirstQuery: true });
  }, [handleSearch]);

  return (
    <Container isFocused={isFocused} {...rest}>
      <CircularButton icon={MdSearch} hoverColor="#e3e5e6" containerSize={4} />
      <input
        type="text"
        placeholder="Pesquisar"
        value={inputQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
      />
      <CircularButton
        icon={MdClose}
        hoverColor="#e3e5e6"
        containerSize={4}
        visibility={showClearButton ? 'visible' : 'hidden'}
        onClick={handleClear}
      />
    </Container>
  );
};

export default SearchBar;
