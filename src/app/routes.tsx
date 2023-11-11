import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { Details } from '../widgets/Details';

export const routes = [
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
];
