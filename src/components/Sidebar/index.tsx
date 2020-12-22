import React, { useMemo } from 'react';
import {
  MdLightbulbOutline,
  MdLabelOutline,
  MdModeEdit,
  MdArchive,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../hooks/sidebar';

import { Container, SidebarItem } from './styles';

interface SidebarProps {
  show: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ show }) => {
  const { getTags, isSelected, selectTag } = useSidebar();
  const tags = useMemo(() => getTags(), [getTags]);

  return (
    <Container show={show}>
      <Link to="/">
        <SidebarItem
          onClick={() => selectTag('notes')}
          selected={isSelected('notes')}
        >
          <MdLightbulbOutline size={24} />
          <span>Notas</span>
        </SidebarItem>
      </Link>

      {tags.map(tag => (
        <Link to={`/tags/${tag.id}`}>
          <SidebarItem
            key={tag.id}
            onClick={() => selectTag(tag.id)}
            selected={isSelected(tag.id)}
          >
            <MdLabelOutline size={24} />
            <span>{tag.name}</span>
          </SidebarItem>
        </Link>
      ))}

      <SidebarItem
        onClick={() => selectTag('edit_tags')}
        selected={isSelected('edit_tags')}
      >
        <MdModeEdit size={24} />
        <span>Editar marcadores</span>
      </SidebarItem>

      <Link to="/archive">
        <SidebarItem
          onClick={() => selectTag('archive')}
          selected={isSelected('archive')}
        >
          <MdArchive size={24} />
          <span>Arquivo</span>
        </SidebarItem>
      </Link>
      <p>
        Feito com ❤️ por&nbsp;
        <strong>
          <a href="http://lucasbarzan.com">Lucas Barzan</a>
        </strong>
      </p>
    </Container>
  );
};

export default Sidebar;
