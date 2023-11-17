import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { AppStore, rootReducer } from '../store/store.tsx';
import { SearchState } from '../store/searchSlice.tsx';
import { apiSlice } from '../services/apiSlice.tsx';

interface RootState {
  search: SearchState;
}

interface RenderWithProvidersOptions {
  preloadedState?: RootState;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState || ({} as RootState),
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    }),
    ...renderOptions
  }: RenderOptions & RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
