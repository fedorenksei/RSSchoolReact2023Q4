import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { products } from '../server/mock-data';
import { renderApp } from './utils';

describe('Details', () => {
  // see in Card --> Check that a loading indicator is displayed while fetching data;
  // see in Card --> Make sure the detailed card component correctly displays the detailed card data;

  test('Ensure that clicking the close button hides the component.', async () => {
    const { user, router } = renderApp();
    const product = products[0];
    const elem = await screen.findByText(product.title);
    await act(async () => {
      await user.click(elem);
    });
    await screen.findByTestId('loader');
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    expect(await screen.findAllByText(product.title)).toHaveLength(2);
    expect(router.state.location.pathname).toMatch('details');

    await user.click(screen.getByText(/close/i));
    expect(await screen.findAllByText(product.title)).toHaveLength(1);
    expect(router.state.location.pathname).not.toMatch('details');
  });
});
