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

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  searchIn: React.MutableRefObject<string>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchIn, ...rest }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);

  const { addToast } = useToast();
  const { setNotes } = useNotes();

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
    async (query: string) => {
      try {
        let response;

        if (searchIn.current === 'all') {
          // All notes
          response = await api.getAllNotes({
            status: NoteStatus.ACTIVE,
            query,
          });
        } else if (searchIn.current === 'archive') {
          // Archived notes
          response = await api.getAllNotes({
            status: NoteStatus.ARCHIVED,
            query,
          });
        } else {
          // A tag's notes
          response = await api.getAllNotes({
            status: NoteStatus.ACTIVE,
            query,
            tagId: searchIn.current,
          });
        }

        setNotes(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao pesquisar notas',
        });
      }
    },
    [addToast, searchIn, setNotes],
  );

  const handleInputKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        handleSearch(inputQuery);
      }
    },
    [handleSearch, inputQuery],
  );

  const handleClear = useCallback(() => {
    setShowClearButton(false);
    setInputQuery('');

    handleSearch('');
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
