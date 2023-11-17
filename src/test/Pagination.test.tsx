import { describe, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Pagination } from '../components/Pagination.tsx';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from './test-utils.tsx';

describe('Pagination.tsx', () => {
  //
  it('should update page number when page changes', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination maxAmountOfPages={5} queryKey={ListQueryParams.Page} />,
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const nextBtn = screen.getByText(/Next page/i);
    await user.click(nextBtn);
    await user.click(nextBtn);
    const currPage = screen.getByTestId('pagination-curr-page').innerHTML;
    expect(currPage).toBe('3');
  });
  //Make sure the component updates URL query parameter when page changes.
  it('should update url query when page changes', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Pagination maxAmountOfPages={5} queryKey={ListQueryParams.Page} />,
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const nextBtn = screen.getByText(/Next page/i);
    await user.click(nextBtn);
    await user.click(nextBtn);
    console.log(location.pathname);
    expect(location.search).toBe('?page=3');
  });
});
