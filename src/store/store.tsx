import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import searchReducer from './searchSlice.tsx';
import viewPerPageReducer from './viewPerPageSlice.tsx';
import { apiSlice } from './api/apiSlice.tsx';
import loadingFlagPeopleReducer from './loadingFlagPeopleSlice.tsx';
import loadingFlagDetailsSReducer from './loadingFlagDetails.tsx';

export const rootReducer = combineReducers({
  searchReducer,
  viewPerPageReducer,
  loadingFlagPeopleReducer,
  loadingFlagDetailsSReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
