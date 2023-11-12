import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PeopleListContext } from '../components/PeopleListContext.tsx';
import PeopleList from '../components/PeopleList.tsx';
import { BrowserRouter } from 'react-router-dom';
import {
  PEOPLE_CONTEXT_MOCK,
  PEOPLE_CONTEXT_NO_RESULTS_MOCK,
} from '../models/mock.const.tsx';

describe('PeopleList.tsx', () => {
  //Verify that the component renders the specified number of cards
  it('should render the right amount of people', function () {
    render(
      <PeopleListContext.Provider value={PEOPLE_CONTEXT_MOCK}>
        <PeopleList></PeopleList>
      </PeopleListContext.Provider>,
      {
        wrapper: BrowserRouter,
      }
    );
    const list = screen.getAllByTestId('person-container');
    expect(list.length).toBe(2);
  });

  //Check that an appropriate message is displayed if no cards are present.
  it('should show no results fount if no people available', function () {
    render(
      <PeopleListContext.Provider value={PEOPLE_CONTEXT_NO_RESULTS_MOCK}>
        <PeopleList></PeopleList>
      </PeopleListContext.Provider>,
      {
        wrapper: BrowserRouter,
      }
    );
    const noResultsContainer = screen.getByTestId('people-no-results');
    expect(noResultsContainer).toBeInTheDocument();
    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });
});
