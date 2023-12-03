import { createSlice } from '@reduxjs/toolkit';
import countriesList from '../data/countriesList';

const initialState = {
  value: countriesList,
};

const countriesListSlice = createSlice({
  name: 'countriesList',
  initialState,
  reducers: {},
});

export default countriesListSlice.reducer;
