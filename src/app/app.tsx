import { UserListPage } from '@/pages/user';
import { AppProviders } from './providers';
import './styles/app.css';

export function App() {
  return (
    <AppProviders>
      <UserListPage />
    </AppProviders>
  );
}
