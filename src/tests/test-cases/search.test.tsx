import { describe, expect, test } from 'vitest';
import { renderWithSearchContext } from './utils';
import { SearchInput } from '../../features/SearchInput';
import { screen } from '@testing-library/react';
import { LS_ITEM_NAME } from '../../shared/data/constants';

describe('Search Input', () => {
  test('9.1: clicking the Search button saves the entered value to the local storage', async () => {
    const { user } = renderWithSearchContext(<SearchInput />);
    expect(localStorage.getItem(LS_ITEM_NAME)).toBeNull();

    const text = 'some test input for search submit';
    await user.type(screen.getByRole('textbox'), text);
    await user.click(screen.getByRole('button'));

    expect(localStorage.getItem(LS_ITEM_NAME)).toBe(text);
  });

  test('9.2: clicking the Search button saves the entered value to the local storage', async () => {
    const text = 'some test input for initial value';
    localStorage.setItem(LS_ITEM_NAME, text);
    renderWithSearchContext(<SearchInput />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe(text);
  });
});
