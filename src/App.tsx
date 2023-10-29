import { Component } from 'react';
import './App.css';
import { Search } from './components/Search.tsx';
import { Pokemon, PokemonList } from './components/PokemonList.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { Pagination } from './components/Pagination.tsx';

export const LS_POKEMON = 'pokemon';
interface AppState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  pokemonCount: number | null;
}

class App extends Component<NonNullable<unknown>, AppState> {

  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      pokemons: [],
      loading: true,
      error: null,
      pokemonCount: null,
    };
  }

  componentDidMount = async () => {
    if (localStorage.getItem(LS_POKEMON)) {
      await this.getOnePokemon(localStorage.getItem(LS_POKEMON)!);
    } else {
      await this.getPokemons();
    }
  };

  onSearch = async (searchValue: string) => {
    this.setState({
      loading: true,
      pokemons: [],
      pokemonCount: null,
    });
    if (searchValue) {
      await this.getOnePokemon(searchValue);
    } else {
      await this.getPokemons();
    }
  };

  getOnePokemon = async (value: string) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
      .then((response) => response.json())
      .then((res) =>
        this.setState({
          pokemons: [res],
          loading: false,
        })
      )
      .catch((error) => this.handleError(error));
  }

  getPokemons = async (page: string = '1') => {
    const pokemonPageLimit = 15;
    const initialResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon?$limit=15&offset=${page}`
    );
    const initialData = (await initialResponse.json()) as PokemonList;
    const urls = initialData.results.map((item) => item.url);
    const pokemonData: Pokemon[] = [];

    for (const url of urls) {
      const response = await fetch(url);
      const data = await response.json();
      pokemonData.push(data);
    }

    this.setState({
      pokemons: pokemonData,
      loading: false,
      pokemonCount: Math.ceil(initialData.count / pokemonPageLimit),
    });
  }

  private handleError(error: Error) {
    this.setState({
      error: error.message,
      loading: false,
      pokemons: [],
      pokemonCount: null,
    });
  }

  private setUIError = () => {
    const pokemons = [{ bla: 'bla' }] as unknown as Pokemon[];
    this.setState({
      pokemons: pokemons,
    });
    throw Error('Error');
  };

  render() {
    const { pokemons, loading, pokemonCount } = this.state;

    return (
      <ErrorBoundary>
        <>
          <button onClick={this.setUIError}>Error</button>
          <div>
            <Search searchValue={this.onSearch} />
          </div>
          {pokemonCount && <Pagination selectAmount={pokemonCount} currentPage={this.getPokemons}></Pagination>}
          {pokemons.length ? (
            <div className="pokemon-list">
              {pokemons.map((pokemon) => (
                <Pokemon pokemon={pokemon} key={pokemon.id} />
              ))}
            </div>
          ) : loading ? (
            <div>Loading...</div>
          ) : (
            <p>No results found</p>
          )}
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
