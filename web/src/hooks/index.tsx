import React from 'react';

import { AuthProvider } from './auth';
import { TagsProvider } from './tags';
import { NotesProvider } from './notes';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <TagsProvider>
      <NotesProvider>
        <ToastProvider>{children}</ToastProvider>
      </NotesProvider>
    </TagsProvider>
  </AuthProvider>
);

export default AppProvider;
