import { FormEvent } from 'react';

interface SearchProps {
  searchValue: (value: string) => void;
  lsName: string;
  initValue: string;
}

export function Search({ initValue, searchValue, lsName }: SearchProps) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const value = formData.get('searchInput') as string;
      value
      ? localStorage.setItem(lsName, value)
      : localStorage.removeItem(lsName);
    searchValue(value);
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
          defaultValue={initValue}
        ></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
}
