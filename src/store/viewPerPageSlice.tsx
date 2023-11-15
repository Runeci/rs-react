import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_ITEMS_PER_PAGE } from '../models/const.tsx';
import { ListQueryParams } from '../models/enums.tsx';

const perPageQueryParam = new URLSearchParams(window.location.search).get(
  ListQueryParams.ItemsPerPage
);

interface ViewPerPage {
  value: string;
}

export const viewPerPageSlice = createSlice({
  name: 'perPageCount',
  initialState: {
    value: perPageQueryParam || DEFAULT_ITEMS_PER_PAGE,
  },
  reducers: {
    changePerPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changePerPage } = viewPerPageSlice.actions;

export const selectItemsPerPage = (state: { itemsPerPage: ViewPerPage }) =>
  state.itemsPerPage.value;

export default viewPerPageSlice.reducer;
