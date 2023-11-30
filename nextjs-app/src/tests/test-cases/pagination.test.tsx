import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Pagination } from '../../components/features/Pagination';
import { renderWithStore } from './utils';
import mockRouter from 'next-router-mock';

describe('Pagination', () => {
  test('component updates URL query parameter when page changes', async () => {
    const { user } = renderWithStore(<Pagination total={100} />);

    const pageNum = '2';
    await user.click(await screen.findByText(pageNum));

    expect(mockRouter.query.page).toBe(pageNum);
  });
});
