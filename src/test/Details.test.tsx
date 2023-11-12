import { afterEach, beforeEach, describe, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Details from '../components/Details.tsx';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PEOPLE_CONTEXT_MOCK, PERSON_MOCK } from '../models/mock.const.tsx';
import { SearchContext } from '../components/SearchContext.tsx';
import { PeopleListContext } from '../components/PeopleListContext.tsx';
import PeopleList from '../components/PeopleList.tsx';
import { userEvent } from '@testing-library/user-event';
import { SWAPI } from '../services/SWAPI.tsx';

describe('Details.tsx interactions', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SearchContext.Provider value="search">
                <PeopleListContext.Provider value={PEOPLE_CONTEXT_MOCK}>
                  <PeopleList />
                </PeopleListContext.Provider>
              </SearchContext.Provider>
            }
          >
            <Route path="detail/:id" element={<Details />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );
  });

  //Validate that clicking on a card opens a detailed card component;
  it('should show details component when click on person card', async () => {
    vi.spyOn(SWAPI.prototype, 'getPersonDetail').mockResolvedValue(PERSON_MOCK);

    const user = userEvent.setup();
    await user.click(screen.getAllByTestId('person-container')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('detail-container')).toBeInTheDocument();
      expect(screen.getByTestId('detail-close-btn')).toBeInTheDocument();
    });
  });

  //Make sure the detailed card component correctly displays the detailed card data
  it('shf', async () => {
    vi.spyOn(SWAPI.prototype, 'getPersonDetail').mockResolvedValue(PERSON_MOCK);
    const user = userEvent.setup();
    await user.click(screen.getAllByTestId('person-container')[0]);
    await waitFor(() => {
      const name = screen.getByTestId('detail-name').innerHTML;
      expect(name).toBe(`Detail ${PERSON_MOCK.name}`);
    });
  });

  //Check that a loading indicator is displayed while fetching data;
  it('should show loading process while fetching', async () => {
    const user = userEvent.setup();
    await user.click(screen.getAllByTestId('person-container')[0]);
    const loading = screen.getByText(/Details are loading.../i);
    expect(loading).toBeInTheDocument();
  });

  //Check that clicking triggers an additional API call to fetch detailed information.
  it('should trigger an  API call to fetch detailed information', async () => {
    const spy = vi
      .spyOn(SWAPI.prototype, 'getPersonDetail')
      .mockResolvedValue(PERSON_MOCK);
    const user = userEvent.setup();
    await user.click(screen.getAllByTestId('person-container')[0]);
    expect(spy).toHaveBeenCalled();
  });
});

describe('Details.tsx', () => {
  //Ensure that clicking the close button hides the component
  it('should hide details component on btn close click', async () => {
    vi.spyOn(SWAPI.prototype, 'getPersonDetail').mockResolvedValue(PERSON_MOCK);
    render(
      <MemoryRouter initialEntries={['/detail/2']}>
        <Routes>
          <Route
            path="/"
            element={
              <SearchContext.Provider value="search">
                <PeopleListContext.Provider value={PEOPLE_CONTEXT_MOCK}>
                  <PeopleList />
                </PeopleListContext.Provider>
              </SearchContext.Provider>
            }
          >
            <Route path="detail/:id" element={<Details />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const closeButton = await screen.findByTestId('detail-close-btn');
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    const detailCard = await screen.queryByTestId('detail-close-btn');
    expect(detailCard).not.toBeInTheDocument();
  });
});
