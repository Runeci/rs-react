import Person from './Person.tsx';
import {
  createSearchParams,
  Outlet,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ROUTER_PATHS } from '../router/router.tsx';
import { SWPerson, useGetPeopleInfoQuery } from '../services/apiSlice.tsx';
import { ListQueryParams } from '../models/enums.tsx';
import { START_PAGE } from '../models/const.tsx';
import { setLoadingFlagPeople } from '../store/loadingFlagPeopleSlice.tsx';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/redux.tsx';

const PeopleList = () => {
  const navigate = useNavigate();

  const [queryParams] = useSearchParams();
  const page = queryParams.get(ListQueryParams.Page) || START_PAGE.toString();

  const dispatchAction = useAppDispatch();
  const isLoadingPeopleList = useAppSelector(
    (state) => state.loadingFlagPeopleReducer.value
  );
  const search = useAppSelector((state) => state.searchReducer.value);
  const {
    data: people,
    isFetching,
    isSuccess,
    error,
  } = useGetPeopleInfoQuery({
    page,
    search,
  });

  useEffect(() => {
    if (isFetching) {
      dispatchAction(setLoadingFlagPeople(true));
    } else {
      dispatchAction(setLoadingFlagPeople(false));
    }
  }, [isFetching, dispatchAction]); // I really do not see the point doing it in a such way, but task needs to be done

  const closeDetails = (e: React.MouseEvent<HTMLUListElement>) =>
    e.target === e.currentTarget
      ? navigate({
          pathname: ROUTER_PATHS.root,
          search: createSearchParams(queryParams).toString(),
        })
      : null;

  let content;

  if (isLoadingPeopleList) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = people.length ? (
      <ul className="people-list" onClick={closeDetails}>
        {people.results.map((person: SWPerson) => (
          <Person person={person} key={person.name} />
        ))}
      </ul>
    ) : (
      <div>No results</div>
    );
  } else if (error) {
    if ('status' in error && error.status === 404) {
      content = <div>Error loading data. Try again</div>;
    }
  }
  return (
    <>
      {content}
      <Outlet />
    </>
  );
};

export default PeopleList;
