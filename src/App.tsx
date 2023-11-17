import './App.css';
import { ErrorBoundary } from './helpers/ErrorBoundary.tsx';
import MainPage from './components/MainPage.tsx';

import { Provider } from 'react-redux';
import { setupStore } from './store/store.tsx';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={setupStore()}>
        <MainPage />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
