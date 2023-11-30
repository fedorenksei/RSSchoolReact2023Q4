import { describe, test } from 'vitest';
import mockRouter from 'next-router-mock';
import { render, screen } from '@testing-library/react';
import NotFound from '@/pages/404';

describe('404 Page', () => {
  test('404 page is displayed when navigating to an invalid route', () => {
    mockRouter.push('/wrongpath');
    render(<NotFound />);
    screen.getByText(/not found/);
  });
});
