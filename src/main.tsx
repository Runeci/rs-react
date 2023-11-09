import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Details from './components/Details.tsx';

export const ROUTER_PATHS = {
  root: '/',
  detail: 'detail',
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTER_PATHS.root} element={<App />}>
      <Route path={ROUTER_PATHS.detail + '/:id'} element={<Details />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
