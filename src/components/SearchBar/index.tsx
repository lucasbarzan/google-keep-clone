import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  InputHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';
import { MdSearch, MdClose } from 'react-icons/md';

import CircularButton from '../CircularButton';
import { Container } from './styles';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [hasFocusedBefore, setHasFocusedBefore] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    setHasFocusedBefore(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isFilled={isFilled}
      isFocused={isFocused}
      hasFocusedBefore={hasFocusedBefore}
    >
      <CircularButton icon={MdSearch} hoverColor="#e3e5e6" containerSize={4} />
      <input
        type="text"
        placeholder="Pesquisar"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      <CircularButton
        icon={MdClose}
        hoverColor="#e3e5e6"
        containerSize={4}
        visibility={hasFocusedBefore ? 'visible' : 'hidden'}
      />
    </Container>
  );
};

export default SearchBar;
