import { Search } from './Search.tsx';
import { Pagination } from './Pagination.tsx';
import { useParams } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';
import PeopleList from './PeopleList.tsx';
import { useFetchPeopleList } from '../custom-hooks/FetchPeopleList.hook.tsx';

const MainPage = () => {
  const { id } = useParams();
  const { maxPageAmount } = useFetchPeopleList();

  return (
    <>
      <Search />

      <div style={{ margin: '40px 0' }}>
        <Pagination
          maxAmountOfPages={maxPageAmount}
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
