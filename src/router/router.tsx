import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from '../App.tsx';
import Details from '../components/Details.tsx';
import NoPageFound from '../components/NoPageFound.tsx';

export const ROUTER_PATHS = {
  root: '/',
  detail: 'detail',
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={ROUTER_PATHS.root}
      element={<App />}
      errorElement={<NoPageFound />}
    >
      <Route path={ROUTER_PATHS.detail + '/:id'} element={<Details />}></Route>
    </Route>
  )
);
