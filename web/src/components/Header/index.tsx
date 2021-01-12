import React from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdExitToApp } from 'react-icons/md';

import CircularButton from '../CircularButton';
import SearchBar from '../SearchBar';
import Logo from '../../assets/logo.png';
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
  onToggleSidebar(): void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { signOut } = useAuth();

  return (
    <Container>
      <CircularButton icon={MdMenu} onClick={onToggleSidebar} />
      <Link to="/">
        <img src={Logo} alt="Google Keep Clone Logo" />
        <h1>Keep Clone</h1>
      </Link>
      <SearchBar name="search" />
      <CircularButton id="exit-button" icon={MdExitToApp} onClick={signOut} />
    </Container>
  );
};

export default Header;
