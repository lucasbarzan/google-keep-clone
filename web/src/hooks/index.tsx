import React from 'react';

import { AuthProvider } from './auth';
import { TagsProvider } from './tags';
import { NotesProvider } from './notes';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <NotesProvider>
      <TagsProvider>
        <ToastProvider>{children}</ToastProvider>
      </TagsProvider>
    </NotesProvider>
  </AuthProvider>
);

export default AppProvider;
