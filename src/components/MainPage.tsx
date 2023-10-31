import { SWAPI, SWPerson } from '../services/SWAPI.tsx';
import { Component } from 'react';
import { LS_PEOPLE, SEARCH_AMOUNT_PER_PAGE } from '../models/const.tsx';
import { Search } from './Search.tsx';
import PeopleList from './PeopleList.tsx';
import { Pagination } from './Pagination.tsx';

interface MainPageState {
  people: SWPerson[];
  loading: boolean;
  error: boolean;
  searchValue: string;
  peopleCount: number | null;
  currentPage: string;
}

class MainPage extends Component<NonNullable<unknown>, MainPageState> {
  constructor(
    props: NonNullable<unknown>,
    private SWAPIService: SWAPI
  ) {
    super(props);
    this.SWAPIService = new SWAPI();
    this.state = {
      people: [],
      loading: true,
      error: false,
      searchValue: '',
      peopleCount: null,
      currentPage: '1',
    };
    this.handleErrorButtonClick = this.handleErrorButtonClick.bind(this);
  }

  componentDidMount = async () => {
    const searchValue = localStorage.getItem(LS_PEOPLE) || '';
    await this.SWAPIService.getSWPeople(searchValue, '1')
      .then((res) =>
        this.setState({
          people: res.results,
          peopleCount: res.count,
          loading: false,
          searchValue,
        })
      )
      .catch(() => this.handleError());
  };

  onSearch = async (searchValue: string, page: string = '1') => {
    this.setState({
      loading: true,
      people: [],
      peopleCount: null,
      searchValue,
    });
    await this.SWAPIService.getSWPeople(searchValue, page)
      .then((res) => {
        this.setState({
          people: res.results,
          loading: false,
          peopleCount: res.count,
          searchValue,
        });
      })
      .catch(() => this.handleError);
  };

  onPageSelect = async (page: string) => {
    this.setState({ currentPage: page });
    await this.onSearch(this.state.searchValue, page);
  };

  private handleError() {
    this.setState({
      error: true,
      loading: false,
      people: [],
      peopleCount: null,
    });
  }

  handleErrorButtonClick() {
    this.setState({ error: true });
  }

  render() {
    const { people, loading, currentPage } = this.state;

    if (this.state.error) {
      throw new Error();
    }

    return (
      <>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          <Search initValue={localStorage.getItem(LS_PEOPLE) || ''} searchValue={this.onSearch} lsName={LS_PEOPLE} />

          <button className="error" onClick={this.handleErrorButtonClick}>
            Error
          </button>
        </div>

        <div className="pagination">
          {people?.length >= SEARCH_AMOUNT_PER_PAGE ? (
            <Pagination
              page={currentPage}
              selectAmount={SEARCH_AMOUNT_PER_PAGE}
              currentPage={this.onPageSelect}
            />
          ) : null}
        </div>
        <div>
          {people?.length ? (
            <PeopleList peopleList={people}></PeopleList>
          ) : loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="no-results">No results found</div>
          )}
        </div>
      </>
    );
  }
}

export default MainPage;
