import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Search for Products of DummyJSON'
    );
    expect(await screen.findByText('mock test')).toBeInTheDocument();
  });
});
