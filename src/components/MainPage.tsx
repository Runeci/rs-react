import { useEffect, useState } from 'react';
import { SWAPI, SWPerson } from '../services/SWAPI.tsx';
import {
  DEFAULT_ITEMS_PER_PAGE,
  LS_SEARCH,
  START_PAGE,
} from '../models/const.tsx';
import { Search } from './Search.tsx';
import { Pagination } from './Pagination.tsx';
import PeopleList from './PeopleList.tsx';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';

const MainPage = () => {
  const SWAPIService = new SWAPI();
  const { id } = useParams();

  const [data, setData] = useState<SWPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPageAmount, setPageAmount] = useState(1);
  const [searchBarParams, setSearchBarParams] = useSearchParams();
  const initSearchValue = localStorage.getItem(LS_SEARCH) || '';

  useEffect(() => {
    setLoading(true);
    setData([]);

    async function fetchData() {
      const searchValue =
        searchBarParams.get(ListQueryParams.Search) || initSearchValue || '';
      const pageValue =
        searchBarParams.get(ListQueryParams.Page) || START_PAGE.toString();
      const perPage =
        searchBarParams.get(ListQueryParams.ItemsPerPage) ||
        DEFAULT_ITEMS_PER_PAGE.toString();

      await SWAPIService.getSWPeople(searchValue, pageValue)
        .then((res) => {
          perPage === '5'
            ? setData(res.results.splice(0, 5))
            : setData(res.results);
          setPageAmount(Math.ceil(res.count / DEFAULT_ITEMS_PER_PAGE));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBarParams]);

  const addQueryParam = (key: ListQueryParams, value: string) => {
    searchBarParams.set(key, value);
    setSearchBarParams(searchBarParams);
  };

  const addSearchParam = (value: string) => {
    value
      ? searchBarParams.set(ListQueryParams.Search, value)
      : searchBarParams.delete(ListQueryParams.Search);

    searchBarParams.set(ListQueryParams.Page, '1');
    setSearchBarParams(searchBarParams);
  };

  return (
    <>
      <Search
        onSearchValueChange={(searchValue) => addSearchParam(searchValue)}
        lsName={LS_SEARCH}
        initValue={initSearchValue}
      />

      <div style={{ margin: '40px 0' }}>
        {maxPageAmount > 1 ? (
          <Pagination
            maxAmountOfPages={maxPageAmount}
            onSetCurrentPage={(page) =>
              addQueryParam(ListQueryParams.Page, page.toString())
            }
            onSetAmountPerPage={(perPage) =>
              addQueryParam(ListQueryParams.ItemsPerPage, perPage)
            }
          />
        ) : null}
      </div>

      <div
        style={
          id
            ? {
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '100px',
                width: '100p%',
              }
            : { display: 'block' }
        }
      >
        {data?.length ? (
          <PeopleList peopleList={data} />
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          <div>No results</div>
        )}
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
