import { createSlice } from '@reduxjs/toolkit';

export interface LoadingFlagPeopleState {
  value: boolean;
}

const initialState: LoadingFlagPeopleState = {
  value: true,
};

export const loadingFlagPeopleSlice = createSlice({
  name: 'loadingFlagPeople',
  initialState,
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

export default loadingFlagPeopleSlice.reducer;
