import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../../shared/data/types';

export interface State {
  data: ProductData[];
  total: number;
  isLoading: boolean;
  isError: boolean;
}

const initialState: State = {
  data: [],
  total: 0,
  isLoading: true,
  isError: false,
};

export const searchResultsSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ProductData[]>) => {
      state.data = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export const { setData, setTotal, setIsLoading, setIsError } =
  searchResultsSlice.actions;
export default searchResultsSlice.reducer;
