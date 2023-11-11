import { useContext } from 'react';
import { Search } from './Search.tsx';
import { Pagination } from './Pagination.tsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';
import { SearchContext, UpdateSearchContext } from './SearchContext.tsx';
import PeopleList from './PeopleList.tsx';
import { useFetchPeopleList } from '../custom-hooks/FetchPeopleList.hook.tsx';

const MainPage = () => {
  const [searchBarParams, setSearchBarParams] = useSearchParams();
  const { id } = useParams();

  const search = useContext(SearchContext);
  const updateSearch = useContext(UpdateSearchContext);
  const { maxPageAmount } = useFetchPeopleList();

  const addQueryParam = (key: ListQueryParams, value: string) => {
    searchBarParams.set(key, value);
    setSearchBarParams(searchBarParams);
  };

  return (
    <>
      <Search
        searchValue={search}
        onSearchUpdate={(res) => updateSearch(res)}
      />

      <div style={{ margin: '40px 0' }}>
        <Pagination
          maxAmountOfPages={maxPageAmount}
          onSetCurrentPage={(page) =>
            addQueryParam(ListQueryParams.Page, page.toString())
          }
          onSetAmountPerPage={(perPage) =>
            addQueryParam(ListQueryParams.ItemsPerPage, perPage)
          }
        />
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
        <PeopleList />
      </div>
    </>
  );
};

export default MainPage;
