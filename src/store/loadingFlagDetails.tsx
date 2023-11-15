import { createSlice } from '@reduxjs/toolkit';

interface LoadingFlagDetails {
  value: boolean;
}

export const loadingFlagDetailsSlice = createSlice({
  name: 'loadingFlagDetails',
  initialState: {
    value: true,
  },
  reducers: {
    setLoadingFlagDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLoadingFlagDetails } = loadingFlagDetailsSlice.actions;

export const selectLoadingFlagDetails = (state: {
  loadingFlagDetails: LoadingFlagDetails;
}) => {
  state.loadingFlagDetails.value;
};

export default loadingFlagDetailsSlice.reducer;
