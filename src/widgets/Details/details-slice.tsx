import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface State {
  value: boolean;
}

const initialState: State = {
  value: false,
};

export const productDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLoading } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
