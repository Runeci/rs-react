import { Search } from '../search/Search.tsx';
import { Pagination } from '../pagination/Pagination.tsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { ListQueryParams } from '../../models/enums.tsx';
import PeopleList from '../people-list/PeopleList.tsx';
import { useGetPeopleInfoQuery } from '../../store/api/apiSlice.tsx';
import { DEFAULT_ITEMS_PER_PAGE, START_PAGE } from '../../models/const.tsx';
import { useAppSelector } from '../../store/redux.tsx';

const MainPage = () => {
  const { id } = useParams();
  const [queryParams] = useSearchParams();

  const search = useAppSelector((store) => store.searchReducer.value);
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
