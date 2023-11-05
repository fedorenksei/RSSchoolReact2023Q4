import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home';
import { NotFound } from '../pages/notFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'pages/:page',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const RootRouter = () => {
  return <RouterProvider router={router} />;
};
