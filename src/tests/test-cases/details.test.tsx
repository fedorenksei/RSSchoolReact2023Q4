import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { Details } from '../../widgets/Details';
import { products } from '../server/mock-data';
import { arrangeProduct } from './utils';

describe('Details', () => {
  test('7.1: loading indicator is displayed while fetching data', async () => {
    const product = products[0];
    const { actionClick } = arrangeProduct(product);

    expect(screen.queryByTestId('loader')).toBeNull();

    await actionClick();

    await screen.findByTestId('loader');
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
  });

  test('7.2: Detailed card component correctly displays the detailed card data', async () => {
    const product = products[0];
    const router = createMemoryRouter(
      [{ element: <Details />, path: '/details/:detailsId' }],
      {
        initialEntries: [`/details/${product.id}`],
      }
    );
    render(<RouterProvider router={router}></RouterProvider>);
    await screen.findByTestId('loader');
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toBe(product.thumbnail);
    screen.getByText(product.title);
    screen.getByText(product.description);
  });

  test('7.3: Ensure that clicking the close button hides the component.', async () => {
    const product = products[0];
    const { actionClick, router, user } = arrangeProduct(product);

    await actionClick();

    await screen.findByTestId('loader');
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    expect(await screen.findAllByText(product.title)).toHaveLength(2);
    expect(router.state.location.pathname).toMatch('details');

    await user.click(screen.getByText(/close/i));
    expect(await screen.findAllByText(product.title)).toHaveLength(1);
    expect(router.state.location.pathname).not.toMatch('details');
  });
});
