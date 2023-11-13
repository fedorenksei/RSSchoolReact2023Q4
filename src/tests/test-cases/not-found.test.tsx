import { describe, test } from 'vitest';
import { NotFound } from '../../pages/NotFound';
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('404 Page', () => {
  test('404 page is displayed when navigating to an invalid route', () => {
    const appRoutes = [
      {
        element: <Outlet />,
        children: [
          {
            path: '/',
            element: <div></div>,
            children: [
              {
                path: 'details/:detailsId',
                element: <div></div>,
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
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/wrongpath'],
    });
    render(<RouterProvider router={router} />);

    screen.getByText(/not found/);
  });
});
