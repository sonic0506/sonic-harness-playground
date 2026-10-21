import './styles/app.css';

import { UserListPage } from '@/pages/user';

import { AppProviders } from './providers';

export function App() {
  return (
    <AppProviders>
      <UserListPage />
    </AppProviders>
  );
}
