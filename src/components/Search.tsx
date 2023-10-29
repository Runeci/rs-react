import { FormEvent } from 'react';
import { LS_POKEMON } from '../App.tsx';

interface SearchProps {
  searchValue: (value: string) => void;
}

export function Search({ searchValue }: SearchProps) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const pokemon = formData.get('searchInput') as string;
    pokemon
      ? localStorage.setItem(LS_POKEMON, pokemon)
      : localStorage.removeItem(LS_POKEMON);
    searchValue(pokemon);
  }

  const defaultPokemon = localStorage.getItem('pokemon')
    ? (localStorage.getItem(LS_POKEMON) as string)
    : '';

  return (
    <>
      <form onSubmit={onSubmit}>
        <input className="searchInput" name="searchInput" defaultValue={defaultPokemon}></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
}
