import React, { useCallback, useMemo, useState } from 'react';
import {
  MdLightbulbOutline,
  MdLabelOutline,
  MdModeEdit,
  MdArchive,
} from 'react-icons/md';

import { Container, SidebarItem } from './styles';

interface SidebarProps {
  show: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ show }) => {
  const [selectedItem, setSelectedItem] = useState('');

  const isSelected = useCallback(
    (item_id: string) => {
      return selectedItem === item_id;
    },
    [selectedItem],
  );

  const tags = useMemo(() => {
    return [
      { id: 1, name: 'test 1' },
      { id: 2, name: 'test 2' },
      { id: 3, name: 'test 3' },
    ];
  }, []);

  return (
    <Container show={show}>
      <SidebarItem
        onClick={() => setSelectedItem('notes')}
        selected={isSelected('notes')}
      >
        <MdLightbulbOutline size={24} />
        <span>Notas</span>
      </SidebarItem>

      {tags.map(tag => (
        <SidebarItem
          key={tag.id}
          onClick={() => setSelectedItem(`id-${tag.id}`)}
          selected={isSelected(`id-${tag.id}`)}
        >
          <MdLabelOutline size={24} />
          <span>{tag.name}</span>
        </SidebarItem>
      ))}

      <SidebarItem
        onClick={() => setSelectedItem('edit_tags')}
        selected={isSelected('edit_tags')}
      >
        <MdModeEdit size={24} />
        <span>Editar marcadores</span>
      </SidebarItem>
      <SidebarItem
        onClick={() => setSelectedItem('archive')}
        selected={isSelected('archive')}
      >
        <MdArchive size={24} />
        <span>Arquivo</span>
      </SidebarItem>
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
