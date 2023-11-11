import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { Product } from '../../entities/Product';
import { products } from '../server/mock-data';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../app/routes';

const renderApp = () => {
  const user = userEvent.setup();
  render(
    <RouterProvider
      router={createMemoryRouter(routes, { initialEntries: ['/'] })}
    />
  );
  return { user };
};

describe('Card', () => {
  test('renders the relevant card data', () => {
    const product = products[0];
    render(
      <Product
        view="card"
        data={{
          id: '' + product.id,
          name: product.title,
          imageUrl: product.thumbnail,
          description: product.description,
        }}
      />
    );
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toBe(product.thumbnail);
    screen.getByText(product.title);
    screen.getByText(product.description);
  });

  test('clicking on a card opens a detailed card component', async () => {
    const { user } = renderApp();
    const product = products[0];
    const elem = await screen.findByText(product.title);
    await act(async () => {
      await user.click(elem);
    });
    await screen.findByTestId('loader');
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    expect(await screen.findAllByText(product.title)).toHaveLength(2);
  });

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch');
    const { user } = renderApp();
    const product = products[0];
    const elem = await screen.findByText(product.title);
    await act(async () => {
      await user.click(elem);
    });
    await screen.findByTestId('loader');
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    expect(await screen.findAllByText(product.title)).toHaveLength(2);
    expect(fetchSpy).toHaveBeenCalledWith(
      `https://dummyjson.com/products/${product.id}`
    );
  });
});
