import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NoPageFound from '../components/NoPageFound.tsx';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App.tsx';

describe('NoPageFound.tsx', () => {
  it('should define a page error component', () => {
    const component = render(<NoPageFound />, {
      wrapper: BrowserRouter,
    });
    expect(component).toBeDefined();
  });

  //Ensure that the 404 page is displayed when navigating to an invalid route.
  it('should show no page found when route is wrong', () => {
    render(
      <MemoryRouter initialEntries={['/bla/bla']}>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/No page found/i)).toBeInTheDocument();
  });
});
