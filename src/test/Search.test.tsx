import { describe, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import {
  SearchContext,
  UpdateSearchContext,
} from '../components/SearchContext.tsx';
import { Search } from '../components/Search.tsx';
import { MemoryRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { LS_SEARCH } from '../models/const.tsx';
import { act } from 'react-dom/test-utils';

describe('Search', () => {
  const mockLocalStorage: Record<string, string> = {
    [LS_SEARCH]: 'Search value',
  };

  beforeAll(() => {
    userEvent.setup();
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: vi.fn((key: string, value: string) => {
          mockLocalStorage[key] = value;
        }),
        getItem: vi.fn((key: string) => mockLocalStorage[key]),
      },
    });
  });

  beforeEach(async () => {
    vi.clearAllMocks();

    const searchValue = localStorage.getItem(LS_SEARCH) || '';
    const setSearchValue = vi.fn().mockImplementation((newVal: string) => {
      localStorage.setItem(LS_SEARCH, newVal);
    });
    await act(() => {
      render(
        <SearchContext.Provider value={searchValue}>
          <UpdateSearchContext.Provider value={setSearchValue}>
            <Search />
          </UpdateSearchContext.Provider>
        </SearchContext.Provider>,
        {
          wrapper: MemoryRouter,
        }
      );
    });
  });

  //Check that the component retrieves the value from the local storage upon mounting.
  test('should set search value from local storage', async () => {
    await waitFor(() => {
      expect(screen.getByRole<HTMLInputElement>('searchbox').value).toBe(
        'Search value'
      );
    });
  });

  //Verify that clicking the Search button saves the entered value to the local storage;
  it('should set search value to local storage', async () => {
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    await userEvent.type(searchInput, ' test query string');
    await userEvent.click(screen.getByText('Search'));

    expect(mockLocalStorage[LS_SEARCH]).toBe('Search value test query string');
  });
});
