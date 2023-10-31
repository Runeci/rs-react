import { Component } from 'react';
import './App.css';
import { ErrorBoundary } from './helpers/ErrorBoundary.tsx';
import MainPage from './components/MainPage.tsx';


class App extends Component {

  render() {
    return (
      <ErrorBoundary>
          <MainPage />
      </ErrorBoundary>
    );
  }
}

export default App;
