import { createSlice } from '@reduxjs/toolkit';

interface LoadingFlagPeople {
  value: boolean;
}

export const loadingFlagPeopleSlice = createSlice({
  name: 'loadingFlagPeople',
  initialState: {
    value: true,
  },
  reducers: {
    setLoadingFlagPeople: (
      state,
      action: { type: string; payload: boolean }
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setLoadingFlagPeople } = loadingFlagPeopleSlice.actions;

export const selectPeopleLoadingFlag = (state: {
  loadingFlagPeople: LoadingFlagPeople;
}) => state.loadingFlagPeople.value;

export default loadingFlagPeopleSlice.reducer;
