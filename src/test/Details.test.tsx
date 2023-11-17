import { afterEach, describe, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import Details from '../components/Details.tsx';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from './test-utils.tsx';
import { ROUTER_PATHS } from '../router/router.tsx';
import { PERSON_MOCK } from '../models/mock.const.tsx';
import App from '../App.tsx';
import { server } from './server.tsx';
import { API_URL } from '../services/apiSlice.tsx';

describe('Details.tsx interactions', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  //Validate that clicking on a card opens a detailed card component;
  it('should show details component when click on person card', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path={ROUTER_PATHS.root} element={<App />}>
            <Route path={`${ROUTER_PATHS.detail}/:id`} element={<Details />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await waitFor(() => {
      user.click(screen.getAllByTestId('person-container')[0]);
    });
    await waitFor(() => screen.getByTestId('detail-container'));
    expect(screen.getByTestId('detail-container')).toBeInTheDocument();
  });

  //Make sure the detailed card component correctly displays the detailed card data
  it('should correctly display card data', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByTestId('detail-container'));
    expect(screen.getByTestId('detail-name')).toHaveTextContent(
      PERSON_MOCK.name
    );
    expect(
      screen.getByText(`Gender: ${PERSON_MOCK.gender}`)
    ).toBeInTheDocument();
  });

  //Check that a loading indicator is displayed while fetching data;
  it('should show loading process while fetching', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByText('Details are loading...')).toBeInTheDocument();
  });

  //Check that clicking triggers an additional API call to fetch detailed information.
  it('should trigger an  API call to fetch detailed information', async () => {
    const user = userEvent.setup();
    const requestSpy = vi.fn();
    server.events.on('request:start', ({ request }) => {
      requestSpy(request.url);
    });
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path={ROUTER_PATHS.root} element={<App />}>
            <Route path={`${ROUTER_PATHS.detail}/:id`} element={<Details />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(async () => {
      await user.click(screen.getAllByTestId('person-container')[0]);
      expect(requestSpy).toHaveBeenCalledWith(`${API_URL}1`);
    });
  });
});

describe('Details.tsx', () => {
  //Ensure that clicking the close button hides the component
  it('should hide details component on btn close click', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path={ROUTER_PATHS.root} element={<App />}>
            <Route path={`${ROUTER_PATHS.detail}/:id`} element={<Details />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await waitFor(async () => {
      await user.click(screen.getAllByTestId('person-container')[0]);
      const closeButton = screen.getByTestId('detail-close-btn');
      expect(closeButton).toBeInTheDocument();
      await user.click(closeButton);
    });

    const detailCard = await screen.queryByTestId('detail-container');
    expect(detailCard).not.toBeInTheDocument();
  });
});
