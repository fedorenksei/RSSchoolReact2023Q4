import { act, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SearchInput } from '../../features/Input';
import { Limit } from '../../features/Limit';
import { SearchResults } from '../../features/Results';
import { DEFAULT_LIMIT } from '../../shared/data/constants';
import { renderWithSearchContext } from './utils';

describe('Card List', () => {
  it('5.1: renders the specified number of cards', async () => {
    const { user } = renderWithSearchContext(
      <>
        <Limit />
        <SearchResults />
      </>
    );
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

  it('5.2: an appropriate message is displayed if no cards are present', async () => {
    const { user } = renderWithSearchContext(
      <>
        <SearchInput />
        <SearchResults />
      </>
    );
    expect(await screen.findAllByRole('img')).toHaveLength(DEFAULT_LIMIT);

    await act(async () => {
      await user.type(
        screen.getByRole('textbox'),
        'any input triggers an empty response{enter}'
      );
    });

    screen.findByText(/have not found anything/i);
  });
});
