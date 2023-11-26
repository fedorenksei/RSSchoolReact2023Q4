import { DetailsUI } from '@/components/widgets/Details';
import { transformApiProductData } from '@/shared/utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { act } from 'react-dom/test-utils';
import { describe, expect, test } from 'vitest';
import { products } from '../server/mock-data';

describe('Details', () => {
  test('7.2: Detailed card component correctly displays the detailed card data', async () => {
    mockRouter.push('/');
    const product = products[0];
    render(<DetailsUI details={transformApiProductData(product)} />);

    screen.getByText(product.title);
    screen.getByText(product.description);
  });

  test('7.3: Ensure that clicking the close button hides the component.', async () => {
    mockRouter.push('/details/1');
    const user = userEvent.setup();
    const product = products[0];
    render(<DetailsUI details={transformApiProductData(product)} />);

    await act(async () => await user.click(screen.getByText(/close/i)));

    await waitFor(() => expect(mockRouter.pathname).not.toMatch('details'));
  });
});
