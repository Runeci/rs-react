import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_ITEMS_PER_PAGE } from '../models/const.tsx';
import { ListQueryParams } from '../models/enums.tsx';

const perPageQueryParam = new URLSearchParams(window.location.search).get(
  ListQueryParams.ItemsPerPage
);

interface ViewPerPage {
  value: string;
}

const initialState: ViewPerPage = {
  value: perPageQueryParam || DEFAULT_ITEMS_PER_PAGE.toString(),
};

export const viewPerPageSlice = createSlice({
  name: 'perPageCount',
  initialState,
  reducers: {
    changePerPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changePerPage } = viewPerPageSlice.actions;

export default viewPerPageSlice.reducer;
