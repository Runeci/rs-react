import { beforeAll, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Pagination } from '../components/Pagination.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';
import { userEvent } from '@testing-library/user-event';

describe('Pagination.tsx', () => {
  beforeAll(async () => {
    render(
      <Pagination maxAmountOfPages={5} queryKey={ListQueryParams.Page} />,
      {
        wrapper: BrowserRouter,
      }
    );

    const user = userEvent.setup();
    const nextBtn = screen.getByText(/Next page/i);
    await user.click(nextBtn);
    await user.click(nextBtn);
  });

  //
  it('should update page number when page changes', async () => {
    const currPage = screen.getByTestId('pagination-curr-page').innerHTML;
    expect(currPage).toBe('3');
  });
  //Make sure the component updates URL query parameter when page changes.
  it('should update url query when page changes', async () => {
    expect(location.search).toBe('?page=3');
  });
});
