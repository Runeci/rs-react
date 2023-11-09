import { FormEvent } from 'react';

interface SearchProps {
  searchValue: string;
  onSearchUpdate: (v: string) => void;
}

export function Search({ searchValue, onSearchUpdate }: SearchProps) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const value = formData.get('searchInput') as string;
    onSearchUpdate(value);
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
          className="searchInput"
          name="searchInput"
          defaultValue={searchValue}
        ></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
}
