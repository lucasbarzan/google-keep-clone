import React, {
  useState,
  useCallback,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react';
import { MdSearch, MdClose } from 'react-icons/md';

import CircularButton from '../CircularButton';
import { Container } from './styles';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch(query: string): void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, ...rest }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [hasFocusedBefore, setHasFocusedBefore] = useState(false);

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

  const handleInputKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        onSearch(query);
      }
    },
    [onSearch, query],
  );

  const handleClear = useCallback(() => {
    setQuery('');

    onSearch('');
  }, [onSearch]);

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
        {...rest}
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
