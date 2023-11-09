import './App.css';
import { ErrorBoundary } from './helpers/ErrorBoundary.tsx';
import MainPage from './components/MainPage.tsx';
import { SearchProvider } from './components/SearchContext.tsx';

const App = () => {
  return (
    <ErrorBoundary>
      <SearchProvider>
        <MainPage />
      </SearchProvider>
    </ErrorBoundary>
  );
};

export default App;
