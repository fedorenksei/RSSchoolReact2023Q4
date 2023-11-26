import { ProductUI } from '@/components/entities/Product';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { describe, expect, test } from 'vitest';
import { products } from '../server/mock-data';
import { arrangeProduct } from './utils';
import { transformApiProductData } from '@/shared/utils';

describe('Card', () => {
  test('6.1: renders the relevant card data', () => {
    mockRouter.push('/');
    const product = products[0];
    render(<ProductUI view="card" data={transformApiProductData(product)} />);

    screen.getByText(product.title);
    screen.getByText(product.description);
  });

  test('6.2: clicking on a card opens a detailed card component', async () => {
    mockRouter.push('/');
    const product = products[0];
    const { actionClick } = arrangeProduct(product);

    await actionClick();

    expect(mockRouter.pathname).toBe('/details/1');
  });
});
