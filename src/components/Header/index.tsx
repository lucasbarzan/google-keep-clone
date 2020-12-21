import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { MdMenu } from 'react-icons/md';

import CircularButton from '../CircularButton';
import SearchBar from '../SearchBar';
import Logo from '../../assets/logo.png';
import { Container } from './styles';

interface SearchFormData {
  search: string;
}

interface HeaderProps {
  onToggleSidebar(): void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSearch = useCallback((data: SearchFormData) => {
    const { search } = data;
    console.log(search);
  }, []);

  return (
    <Container>
      <CircularButton icon={MdMenu} onClick={() => onToggleSidebar()} />
      <img src={Logo} alt="Google Keep Clone Logo" />
      <h1>Keep Clone</h1>
      <Form ref={formRef} onSubmit={handleSearch}>
        <SearchBar name="search" />
      </Form>
    </Container>
  );
};

export default Header;
