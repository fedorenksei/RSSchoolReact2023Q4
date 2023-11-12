import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { appRoutes } from '../../app/providers/AppRouter';

export const renderApp = () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(appRoutes, { initialEntries: ['/'] });
  render(<RouterProvider router={router} />);
  return { user, router };
};
