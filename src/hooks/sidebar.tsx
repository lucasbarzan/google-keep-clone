import React, { createContext, useState, useCallback, useContext } from 'react';

export interface SidebarItem {
  id: string;
  name: string;
}

interface SidebarContextData {
  getTags(): SidebarItem[];
  addTag(tag: SidebarItem): void;
  setTags(tags: SidebarItem[]): void;
  removeTag(id: string): void;
  selectTag(id: string): void;
  isSelected(id: string): boolean;
}

const SidebarContext = createContext<SidebarContextData>(
  {} as SidebarContextData,
);

const SidebarProvider: React.FC = ({ children }) => {
  const [allTags, setAllTags] = useState<SidebarItem[]>([]);
  const [selectedTagId, setSelectedTagId] = useState('');

  const getTags = useCallback((): SidebarItem[] => {
    return allTags;
  }, [allTags]);

  const setTags = useCallback((tagsToSet: SidebarItem[]) => {
    setAllTags(tagsToSet);
  }, []);

  const addTag = useCallback((tag: SidebarItem) => {
    setAllTags(state => [...state, tag]);
  }, []);

  const removeTag = useCallback((id: string) => {
    setAllTags(state => state.filter(tagItem => tagItem.id !== id));
  }, []);

  const selectTag = useCallback((id: string) => {
    setSelectedTagId(id);
  }, []);

  const isSelected = useCallback(
    (id: string): boolean => {
      return id === selectedTagId;
    },
    [selectedTagId],
  );

  return (
    <SidebarContext.Provider
      value={{ getTags, setTags, addTag, removeTag, selectTag, isSelected }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

function useSidebar(): SidebarContextData {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}

export { SidebarProvider, useSidebar };
