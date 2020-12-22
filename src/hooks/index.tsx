import React from 'react';

import { AuthProvider } from './auth';
import { SidebarProvider } from './sidebar';
import { NotesProvider } from './notes';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <SidebarProvider>
      <NotesProvider>
        <ToastProvider>{children}</ToastProvider>
      </NotesProvider>
    </SidebarProvider>
  </AuthProvider>
);

export default AppProvider;
