import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getSearchTermFromLS } from '../../shared/external/localStorage';

export interface State {
  value: string;
}

const initialState = () => ({
  value: getSearchTermFromLS(),
});

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;
