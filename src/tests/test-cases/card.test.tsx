import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { ProductUI } from '../../entities/Product';
import { products } from '../server/mock-data';
import { arrangeProduct } from './utils';
import { BASE_URL } from '../../shared/constants';

describe('Card', () => {
  test('6.1: renders the relevant card data', () => {
    const product = products[0];
    render(
      <ProductUI
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

  test('6.2: clicking on a card opens a detailed card component', async () => {
    const product = products[0];
    const { actionClick } = arrangeProduct(product);

    expect(screen.getAllByText(product.title)).toHaveLength(1);

    await actionClick();

    await waitFor(() =>
      expect(screen.getAllByText(product.title)).toHaveLength(2)
    );
  });

  test('6.3: clicking triggers an additional API call to fetch detailed information', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch');

    const product = products[0];
    const { actionClick } = arrangeProduct(product);

    expect(fetchSpy).not.toHaveBeenCalled();

    await actionClick();

    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL}products/${product.id}`);
  });
});
