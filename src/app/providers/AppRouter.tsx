import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { NotFound } from '../../pages/NotFound';
import { Details } from '../../widgets/Details';
import { ErrorBoundary } from './ErrorBoundary';
import { StoreManagement } from './StoreManagement';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export const appRoutes = [
  {
    element: (
      <ErrorBoundary>
        <Provider store={store}>
          <StoreManagement>
            <Outlet />
          </StoreManagement>
        </Provider>
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: 'details/:detailsId',
            element: <Details />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(appRoutes);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
