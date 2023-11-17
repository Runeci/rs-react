import { beforeEach, describe } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import PeopleList from '../components/PeopleList.tsx';
import { renderWithProviders } from './test-utils.tsx';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../services/apiSlice.tsx';
import { server } from './server.tsx';

describe('PeopleList.tsx', () => {
  beforeEach(() => {
    renderWithProviders(
      <MemoryRouter>
        <PeopleList />
      </MemoryRouter>
    );
  });
  //Verify that the component renders the specified number of cards
  it('should render the right amount of people', async function () {
    await waitFor(() => {
      const list = screen.getAllByTestId('person-container');
      expect(list.length).toBe(2);
    });
  });

  //Check that an appropriate message is displayed if no cards are present.
  it('should show no results fount if no people available', async function () {
    server.use(
      http.get(API_URL, () => {
        console.log('fe');
        return HttpResponse.json([]);
      })
    );
    await waitFor(() => {
      expect(screen.getByText(/No results/i)).toBeInTheDocument();
    });
  });
});
