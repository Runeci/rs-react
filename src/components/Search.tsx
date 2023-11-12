import { FormEvent, useContext } from 'react';
import { SearchContext, UpdateSearchContext } from './SearchContext.tsx';

export function Search() {
  const search = useContext(SearchContext);
  const updateSearch = useContext(UpdateSearchContext);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const value = formData.get('searchInput') as string;
    updateSearch(value);
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
