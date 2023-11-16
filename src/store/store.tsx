import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice.tsx';
import viewPerPageReducer from './viewPerPageSlice.tsx';
import { apiSlice } from '../services/apiSlice.tsx';
import loadingFlagPeopleReducer from './loadingFlagPeopleSlice.tsx';
import loadingFlagDetailsSReducer from './loadingFlagDetails.tsx';

export const rootReducer = combineReducers({
  search: searchReducer,
  itemsPerPage: viewPerPageReducer,
  loadingFlagPeople: loadingFlagPeopleReducer,
  loadingFlagDetails: loadingFlagDetailsSReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
