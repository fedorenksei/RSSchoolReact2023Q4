import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { NotFound } from '../../pages/NotFound';
import { Details } from '../../widgets/Details';
import { SearchContextProvider } from './SearchContextProvider';
import { ErrorBoundary } from './ErrorBoundary';

export const appRoutes = [
  {
    element: (
      <ErrorBoundary>
        <SearchContextProvider>
          <Outlet />
        </SearchContextProvider>
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
