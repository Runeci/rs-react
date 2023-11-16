import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { rootReducer } from '../store/store.tsx';
import { BrowserRouter } from 'react-router-dom';
import { SearchState } from '../store/searchSlice.tsx';

interface RootState {
  search: SearchState;
}

interface RenderWithProvidersOptions {
  preloadedState?: RootState;
  store?: EnhancedStore<RootState>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState || ({} as RootState),
    }),
    ...renderOptions
  }: RenderOptions & RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
