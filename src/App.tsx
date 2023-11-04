import { Component } from 'react';
import './App.css';
import { ErrorBoundary } from './helpers/ErrorBoundary.tsx';
import MainPage from './components/MainPage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './components/Details.tsx';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="detail/:id" element={<Details />}></Route>
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}

export default App;
