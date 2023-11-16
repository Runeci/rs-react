import { createSlice } from '@reduxjs/toolkit';
import { LS_SEARCH } from '../models/const.tsx';

export interface SearchState {
  value: string;
}

const initialState: SearchState = {
  value: localStorage.getItem(LS_SEARCH) || '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
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
