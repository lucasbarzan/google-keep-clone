import React, { useCallback, useMemo, useState } from 'react';
import { MdDelete, MdCheck } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useTags } from '../../hooks/tags';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
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
  const [newTag, setNewTag] = useState('');
  const [tempTags, setTempTags] = useState<{ [key: string]: string }>({});

  const { addToast } = useToast();
  const { getTags, addTag, updateTag, removeTag } = useTags();
  const history = useHistory();

  const tags = useMemo(() => getTags(), [getTags]);

  const handleInputNewTag = useCallback(e => {
    setNewTag(e.target.value);
  }, []);

  const handleInputTagName = useCallback(
    (e, tagId: string) => {
      const updatedTempTags = { ...tempTags };
      updatedTempTags[tagId] = e.target.value;
      setTempTags(updatedTempTags);
    },
    [tempTags],
  );

  const handleCreateTag = useCallback(async () => {
    try {
      const response = await api.createTag({
        name: newTag,
      });

      const addedTag = response.data;
      addTag(addedTag);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar marcador',
      });
    }
  }, [addTag, addToast, newTag]);

  const handleSaveTag = useCallback(
    async (tag: Tag) => {
      try {
        const response = await api.updateTag({
          id: tag.id,
          name: tag.name,
        });

        const updatedTag = response.data;
        updateTag(updatedTag);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao salvar marcador',
        });
      }
    },
    [addToast, updateTag],
  );

  const handleDeleteTag = useCallback(
    async (tagId: string) => {
      try {
        await api.deleteTag({
          id: tagId,
        });

        removeTag(tagId);

        history.push('/');
      } catch (err) {
        console.log(err);

        addToast({
          type: 'error',
          title: 'Erro ao deletar marcador',
        });
      }
    },
    [addToast, history, removeTag],
  );

  return (
    <Container>
      <strong>Editar marcadores</strong>
      <div>
        <input
          type="text"
          placeholder="Criar novo marcador"
          value={newTag}
          onChange={e => handleInputNewTag(e)}
        />
        <CircularButton
          icon={MdCheck}
          iconSize={iconSize}
          containerSize={containerSize}
          onClick={handleCreateTag}
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
