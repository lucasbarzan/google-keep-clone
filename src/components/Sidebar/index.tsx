import React, { useCallback, useMemo, useState } from 'react';
import Modal from 'react-modal';
import {
  MdLightbulbOutline,
  MdLabelOutline,
  MdModeEdit,
  MdArchive,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTags } from '../../hooks/tags';
import EditTagsModal from '../EditTagsModal';

import { Container, SidebarItem, modalStyle } from './styles';

interface SidebarProps {
  show: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ show }) => {
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const { getTags, isSelected, selectTag } = useTags();
  const tags = useMemo(() => getTags(), [getTags]);

  const openEditTagsModal = useCallback(() => {
    setEditTagsModalIsOpen(true);
  }, []);

  const afterOpenEditTagsModal = useCallback(() => {
    // ...
  }, []);

  const closeEditTagsModal = useCallback(() => {
    setEditTagsModalIsOpen(false);
  }, []);

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
        <Link to={`/tags/${tag.id}`} key={tag.id}>
          <SidebarItem
            onClick={() => selectTag(tag.id)}
            selected={isSelected(tag.id)}
          >
            <MdLabelOutline size={24} />
            <span>{tag.name}</span>
          </SidebarItem>
        </Link>
      ))}

      <SidebarItem
        onClick={() => openEditTagsModal()}
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

      <Modal
        isOpen={editTagsModalIsOpen}
        onAfterOpen={afterOpenEditTagsModal}
        onRequestClose={closeEditTagsModal}
        style={modalStyle}
        contentLabel="Edit tags modal"
      >
        <EditTagsModal onCloseModal={closeEditTagsModal} />
      </Modal>
    </Container>
  );
};

export default Sidebar;
