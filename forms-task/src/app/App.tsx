import { store } from '@/shared/store/store';
import { AppLayout } from '@/shared/ui-kit/AppLayout';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
  return (
    <AppLayout>
      <Provider store={store}>
        <RouterProvider router={router} />{' '}
      </Provider>
    </AppLayout>
  );
}
