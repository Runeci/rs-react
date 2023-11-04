import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_ITEMS_PER_PAGE, SWAPI, SWPerson } from '../services/SWAPI.tsx';
import { LS_SEARCH } from '../models/const.tsx';
import { Search } from './Search.tsx';
import { Pagination } from './Pagination.tsx';
import PeopleList from './PeopleList.tsx';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';

const MainPage = () => {
  const SWAPIService = useMemo(() => new SWAPI(), []);
  const { id } = useParams();

  const [data, setData] = useState<SWPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPageAmount, setPageAmount] = useState(1);
  const [searchBarParams, setSearchBarParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setData([]);
    const fetchData = async () => {
      const searchValue = searchBarParams.get('search') || '';
      const pageValue = searchBarParams.get('page') || '1';
      const perPage = searchBarParams.get('per') || '10';

      try {
        const res = await SWAPIService.getSWPeople(searchValue, pageValue);
        if (perPage === '5') {
          //Due to not suitable API I decided to do it this way -> just get firs 5 items out of
          // 10(default amount items per page which can not be changed)
          const data = res.results.splice(0, 5);
          setData(data);
        } else {
          setData(res.results);
        }

        setPageAmount(res.count / DEFAULT_ITEMS_PER_PAGE);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchBarParams, SWAPIService]);

  useEffect(() => {
    if (localStorage.getItem(LS_SEARCH)) {
      searchBarParams.set('search', localStorage.getItem(LS_SEARCH) || '');
      setSearchBarParams(searchBarParams);
    }
    return () => {
      searchBarParams.delete('page');
      searchBarParams.delete('per');
      searchBarParams.delete('search');
      setSearchBarParams(searchBarParams);
    };
  });

  const addQueryParam = (key: string, value: string) => {
    if (!value) {
      searchBarParams.delete(key);
    } else {
      searchBarParams.set(key, value);
    }
    if (key === 'search') {
      searchBarParams.delete('page');
      searchBarParams.delete('per');
    }

    setSearchBarParams(searchBarParams);
  };

  return (
    <>
      <Search
        onSearchValueChange={(searchValue) =>
          addQueryParam('search', searchValue)
        }
        lsName={LS_SEARCH}
        initValue={localStorage.getItem(LS_SEARCH) || ''}
      />

      <div style={{ margin: '40px 0' }}>
        {maxPageAmount > 1 ? (
          <Pagination
            maxAmountOfPages={maxPageAmount}
            onSetCurrentPage={(page) => addQueryParam('page', page.toString())}
            onSetAmountPerPage={(perPage) => addQueryParam('per', perPage)}
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
