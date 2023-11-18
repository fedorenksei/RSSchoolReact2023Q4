import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_LIMIT } from '../../shared/data/constants';

export interface State {
  value: number;
}

const initialState: State = {
  value: DEFAULT_LIMIT,
};

export const limitSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setLimit } = limitSlice.actions;
export default limitSlice.reducer;
