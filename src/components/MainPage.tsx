import { Search } from './Search.tsx';
import { Pagination } from './Pagination.tsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';
import PeopleList from './PeopleList.tsx';
import { useGetPeopleInfoQuery } from '../services/apiSlice.tsx';
import { useSelector } from 'react-redux';
import { selectSearch } from '../store/searchSlice.tsx';
import { DEFAULT_ITEMS_PER_PAGE, START_PAGE } from '../models/const.tsx';

const MainPage = () => {
  const { id } = useParams();
  const [queryParams] = useSearchParams();

  const search = useSelector(selectSearch);
  const page = queryParams.get(ListQueryParams.Page) || START_PAGE.toString();
  const { data: people } = useGetPeopleInfoQuery({
    page,
    search,
  });

  return (
    <>
      <Search />

      <div style={{ margin: '40px 0' }}>
        <Pagination
          maxAmountOfPages={Math.ceil(people?.count / DEFAULT_ITEMS_PER_PAGE)}
          queryKey={ListQueryParams.Page}
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
