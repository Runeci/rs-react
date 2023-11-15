import './App.css';
import { ErrorBoundary } from './helpers/ErrorBoundary.tsx';
import MainPage from './components/MainPage.tsx';

import { Provider } from 'react-redux';
import store from './store/store.tsx';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
