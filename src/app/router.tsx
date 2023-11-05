import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home';
import { NotFound } from '../pages/notFound';
import { Details } from '../widgets/details/details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: ':detailsId',
        element: <Details />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const RootRouter = () => {
  return <RouterProvider router={router} />;
};
