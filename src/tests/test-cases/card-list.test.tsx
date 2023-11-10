import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../../app';
import { DEFAULT_LIMIT } from '../../shared/constants';

describe('Card List', () => {
  it('renders the specified number of cards', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(await screen.findAllByRole('img')).toHaveLength(DEFAULT_LIMIT);
    const limitInput = screen.getByLabelText(/per page/i);
    const newValue = 3;
    await act(async () => {
      await user.clear(limitInput);
      await user.type(limitInput, `${newValue}{enter}`);
    });
    screen.getByTestId('loader');
    expect(await screen.findAllByRole('img')).toHaveLength(newValue);
  });

  it('an appropriate message is displayed if no cards are present', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(await screen.findAllByRole('img')).toHaveLength(DEFAULT_LIMIT);
    await act(async () => {
      await user.type(screen.getByRole('textbox'), 'some input{enter}');
    });
    screen.findByText(/have not found anything/i);
  });
});
