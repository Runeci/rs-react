import { createSlice } from '@reduxjs/toolkit';
import { LS_SEARCH } from '../models/const.tsx';

interface SearchState {
  value: string;
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: localStorage.getItem(LS_SEARCH) || '',
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

export const selectSearch = (state: { search: SearchState }) =>
  state.search.value;

export default searchSlice.reducer;
