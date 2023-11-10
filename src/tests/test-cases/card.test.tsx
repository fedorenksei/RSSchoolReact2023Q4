import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Product } from '../../entities/Product';
import { products } from '../server/mock-data';
import { App } from '../../app';

describe('Card', () => {
  it('renders the relevant card data', () => {
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

  it('clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();
    render(<App />);
    const product = products[0];
    const elem = await screen.findByText(product.title);
    await act(async () => {
      await user.click(elem);
    });
    await screen.findByTestId('loader');
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    expect(await screen.findAllByText(product.title)).toHaveLength(2);
  });
});
