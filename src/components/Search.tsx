import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch, setSearchValue } from '../store/searchSlice.tsx';
import { useSearchParams } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';
import { LS_SEARCH } from '../models/const.tsx';

export function Search() {
  const actionDispatch = useDispatch();
  const [queryParams, setQueryParams] = useSearchParams();
  const search = useSelector(selectSearch);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const value = formData.get('searchInput') as string;
    actionDispatch(setSearchValue(value));
    updateQueryParams(value);
    localStorage.setItem(LS_SEARCH, value);
  }

  function updateQueryParams(value: string) {
    queryParams.set(ListQueryParams.Search, value);
    setQueryParams(queryParams);
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <input
          type="search"
          data-testid="search-input"
          className="searchInput"
          name="searchInput"
          defaultValue={search}
        ></input>
        <button data-testid="search-button" type="submit">
          Search
        </button>
      </form>
    </>
  );
}
