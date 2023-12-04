import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormDataRecord, FormDataRedux, FormFieldNames } from '../data/types';

type FormDataState = {
  history: FormDataRecord[];
  newFields: FormFieldNames[];
};

const initialState: FormDataState = {
  history: [],
  newFields: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormDataRecord>) => {
      if (state.history[0]) {
        state.newFields = [];
        const lastData = state.history[0].data;
        const newData = action.payload.data;
        for (const field in newData) {
          if (
            newData[field as keyof FormDataRedux] !==
            lastData[field as keyof FormDataRedux]
          ) {
            state.newFields.push(field as FormFieldNames);
          }
        }
      }
      state.history.unshift(action.payload);
    },
  },
});

export const { setFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
