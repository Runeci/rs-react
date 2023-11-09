import './App.css';
import { ErrorBoundary } from './helpers/ErrorBoundary.tsx';
import MainPage from './components/MainPage.tsx';

const App = () => {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
};

export default App;
