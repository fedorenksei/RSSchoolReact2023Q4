import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormDataRecord } from '../data/types';

type FormDataState = {
  history: FormDataRecord[];
};

const initialState: FormDataState = {
  history: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormDataRecord>) => {
      state.history.unshift(action.payload);
    },
  },
});

export const { setFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
