import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface State {
  isLoading: boolean;
  isError: boolean;
}

const initialState: State = {
  isLoading: true,
  isError: false,
};

export const searchResultsSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export const { setIsLoading, setIsError } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
