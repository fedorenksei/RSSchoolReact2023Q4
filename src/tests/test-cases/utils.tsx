import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { store } from '../../app/store/store';
import { Product } from '../../entities/Product';
import { ApiProductData } from '../../shared/data/types';
import { Details } from '../../widgets/Details';

export const renderWithSearchContext = (children: ReactNode) => {
  const user = userEvent.setup();
  const router = createMemoryRouter([
    {
      path: '*',
      element: <Provider store={store}>{children},</Provider>,
    },
  ]);
  render(<RouterProvider router={router} />);
  return { user, router };
};

export const arrangeProduct = (product: ApiProductData) => {
  const user = userEvent.setup();
  const routes = [
    {
      path: '/',
      element: (
        <div>
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
        </div>
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
