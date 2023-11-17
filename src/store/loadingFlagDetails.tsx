import { createSlice } from '@reduxjs/toolkit';

export interface LoadingFlagDetailsState {
  value: boolean;
}

const initialState = {
  value: true,
};

export const loadingFlagDetailsSlice = createSlice({
  name: 'loadingFlagDetails',
  initialState,
  reducers: {
    setLoadingFlagDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLoadingFlagDetails } = loadingFlagDetailsSlice.actions;

export default loadingFlagDetailsSlice.reducer;
