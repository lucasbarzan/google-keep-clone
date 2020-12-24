import React, { useCallback, useMemo, useState } from 'react';
import { MdDelete, MdCheck } from 'react-icons/md';
import { useTags } from '../../hooks/tags';
import CircularButton from '../CircularButton';

import { Container, TagItem, iconSize, containerSize } from './styles';

export interface Tag {
  id: string;
  name: string;
}

interface EditTagsModalProps {
  onCloseModal: () => void;
}

const EditTagsModal: React.FC<EditTagsModalProps> = ({ onCloseModal }) => {
  // tempTags = { tagId: tagName }
  const [tempTags, setTempTags] = useState<{ [key: string]: string }>({});

  const { getTags, updateTag, removeTag } = useTags();

  const tags = useMemo(() => getTags(), [getTags]);

  const handleInputTagName = useCallback(
    (e, tagId: string) => {
      const updatedTempTags = { ...tempTags };
      updatedTempTags[tagId] = e.target.value;
      setTempTags(updatedTempTags);
    },
    [tempTags],
  );

  const handleSaveTag = useCallback(
    (tag: Tag) => {
      updateTag(tag);
    },
    [updateTag],
  );

  const handleDeleteTag = useCallback(
    (tagId: string) => {
      removeTag(tagId);
    },
    [removeTag],
  );

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
            onClick={() => handleDeleteTag(tag.id)}
          />
          <input
            type="text"
            value={tempTags[tag.id] || tag.name}
            onChange={e => handleInputTagName(e, tag.id)}
          />
          <CircularButton
            id="check"
            icon={MdCheck}
            iconSize={iconSize}
            containerSize={containerSize}
            onClick={() => handleSaveTag({ ...tag, name: tempTags[tag.id] })}
          />
        </TagItem>
      ))}
      <button type="button" onClick={onCloseModal}>
        Concluído
      </button>
    </Container>
  );
};

export default EditTagsModal;
