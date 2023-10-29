import './PokemonList.css';
export interface Pokemon {
  name: string;
  id: number;
  weight: number;
  order: number;
  sprites: {
    front_default: string
  }
}

export interface PokemonList {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonProps {
  pokemon: Pokemon;
}

export function Pokemon({pokemon}: PokemonProps) {
  return (
    <>
      <div className='pokemon-item'>
        <h3>{pokemon.name.toUpperCase()}</h3>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Weight: {pokemon.weight}</p>
        <p>Order: {pokemon.order}</p>
      </div>
    </>
  );
}
