import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AppLayout } from '@/shared/ui-kit/AppLayout';

export function App() {
  return (
    <AppLayout>
      <RouterProvider router={router} />{' '}
    </AppLayout>
  );
}
