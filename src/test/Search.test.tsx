import { describe, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import { Search } from '../components/Search.tsx';
import { userEvent } from '@testing-library/user-event';
import { LS_SEARCH } from '../models/const.tsx';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from './test-utils.tsx';
import { MemoryRouter } from 'react-router-dom';

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
    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Search />
        </MemoryRouter>,
        {
          preloadedState: {
            searchReducer: {
              value: searchValue,
            },
          },
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
