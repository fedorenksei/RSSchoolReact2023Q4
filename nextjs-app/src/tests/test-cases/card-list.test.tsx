import { SearchResults } from '@/components/features/SearchResults';
import { transformApiProductData } from '@/shared/utils';
import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { describe, expect, it } from 'vitest';
import { products } from '../server/mock-data';
import { renderWithStore } from './utils';

describe('Card List', () => {
  it('5.1: renders the specified number of cards', async () => {
    mockRouter.push('/');
    renderWithStore(
      <SearchResults results={products.map(transformApiProductData)} />
    );
    expect(await screen.findAllByRole('img')).toHaveLength(products.length);
  });

  it('5.2: an appropriate message is displayed if no cards are present', async () => {
    mockRouter.push('/');
    renderWithStore(<SearchResults results={[]} />);

    screen.findByText(/have not found anything/i);
  });
});
