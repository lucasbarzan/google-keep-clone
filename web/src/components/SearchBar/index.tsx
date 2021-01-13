import React, {
  useState,
  useCallback,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
import { useNotes } from '../../hooks/notes';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import NoteStatus from '../../utils/NoteStatus';

import CircularButton from '../CircularButton';
import { Container } from './styles';

const SearchBar: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...rest
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);

  const { addToast } = useToast();
  const { setNotes } = useNotes();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    setShowClearButton(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleSearch = useCallback(
    async (search?: string) => {
      try {
        const response = await api.getAllNotes({
          status: NoteStatus.ACTIVE, // ???
          query: search || query,
        });

        setNotes(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao pesquisar notas',
        });
      }
    },
    [addToast, query, setNotes],
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
    setShowClearButton(false);
    setQuery('');

    handleSearch('');
  }, [handleSearch]);

  return (
    <Container isFocused={isFocused} {...rest}>
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
        visibility={showClearButton ? 'visible' : 'hidden'}
        onClick={handleClear}
      />
    </Container>
  );
};

export default SearchBar;
