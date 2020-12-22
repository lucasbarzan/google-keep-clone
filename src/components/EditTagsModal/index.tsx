import React, { useCallback, useMemo } from 'react';
import { MdDelete, MdCheck } from 'react-icons/md';
import { useTags } from '../../hooks/tags';
import CircularButton from '../CircularButton';

import { Container, TagItem, iconSize, containerSize } from './styles';

export interface Tag {
  id: string;
  name: string;
}

const EditTagsModal: React.FC = () => {
  const { getTags } = useTags();

  const tags = useMemo(() => getTags(), [getTags]);

  const handleSaveTag = useCallback((tag: Tag) => {
    console.log(tag);
  }, []);

  return (
    <Container>
      <strong>Editar marcadores</strong>
      <div>
        <input type="text" placeholder="Criar novo marcador" />
        <CircularButton
          icon={MdCheck}
          iconSize={iconSize}
          containerSize={containerSize}
        />
      </div>
      {tags.map(tag => (
        <TagItem key={tag.id}>
          <CircularButton
            icon={MdDelete}
            iconSize={iconSize}
            containerSize={containerSize}
          />
          <span contentEditable>{tag.name}</span>
          <CircularButton
            id="check"
            icon={MdCheck}
            iconSize={iconSize}
            containerSize={containerSize}
            onClick={() => handleSaveTag(tag.id)}
          />
        </TagItem>
      ))}
      <button type="button">Concluído</button>
    </Container>
  );
};

export default EditTagsModal;
