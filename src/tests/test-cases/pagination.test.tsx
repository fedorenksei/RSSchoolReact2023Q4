import { describe, expect, test } from 'vitest';
import { Pagination } from '../../features/Pagination';
import { renderWithStore } from './utils';
import { screen } from '@testing-library/react';

describe('Pagination', () => {
  test('component updates URL query parameter when page changes', async () => {
    const { user, router } = renderWithStore(<Pagination />);

    expect(getPageParam()).toBeNull();

    const pageNum = '2';
    await user.click(await screen.findByText(pageNum));

    expect(getPageParam()).toBe(pageNum);

    function getPageParam() {
      const searchParams = new URLSearchParams(router.state.location.search);
      return searchParams.get('page');
    }
  });
});
