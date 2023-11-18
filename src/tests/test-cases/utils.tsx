import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { configureAppStore } from '../../app/store/store';
import { Product } from '../../entities/Product';
import { ApiProductData } from '../../shared/data/types';
import { Details } from '../../widgets/Details';

export const renderWithStore = (children: ReactNode) => {
  const user = userEvent.setup();
  const store = configureAppStore();
  const router = createMemoryRouter([
    {
      path: '*',
      element: <Provider store={store}>{children}</Provider>,
    },
  ]);
  render(<RouterProvider router={router} />);
  return { user, router };
};

export const arrangeProduct = (product: ApiProductData) => {
  const user = userEvent.setup();
  const store = configureAppStore();
  const routes = [
    {
      path: '*',
      element: (
        <Provider store={store}>
          <Product
            view="card"
            data={{
              id: '' + product.id,
              name: product.title,
              imageUrl: product.thumbnail,
              description: product.description,
            }}
          />
          <Outlet />
        </Provider>
      ),
      children: [
        {
          path: 'details/:detailsId',
          element: <Details />,
        },
      ],
    },
  ];
  const router = createMemoryRouter(routes);
  render(<RouterProvider router={router}></RouterProvider>);

  const actionClick = async () => {
    const elem = await screen.findByText(product.title);
    await act(async () => {
      await user.click(elem);
    });
  };

  return { user, router, actionClick };
};
