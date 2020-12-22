import React from 'react';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';

import CircularButton from '../CircularButton';
import SearchBar from '../SearchBar';
import Logo from '../../assets/logo.png';
import { Container } from './styles';

interface HeaderProps {
  onToggleSidebar(): void;
  onSearch(query: string): void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onSearch }) => {
  return (
    <Container>
      <CircularButton icon={MdMenu} onClick={() => onToggleSidebar()} />
      <Link to="/">
        <img src={Logo} alt="Google Keep Clone Logo" />
        <h1>Keep Clone</h1>
      </Link>
      <SearchBar name="search" onSearch={onSearch} />
    </Container>
  );
};

export default Header;
