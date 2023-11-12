import './App.css';
import { ErrorBoundary } from './helpers/ErrorBoundary.tsx';
import MainPage from './components/MainPage.tsx';
import { SearchProvider } from './components/SearchContext.tsx';
import PeopleProvider from './components/PeopleListContext.tsx';

const App = () => {
  return (
    <ErrorBoundary>
      <SearchProvider>
        <PeopleProvider>
          <MainPage />
        </PeopleProvider>
      </SearchProvider>
    </ErrorBoundary>
  );
};

export default App;
