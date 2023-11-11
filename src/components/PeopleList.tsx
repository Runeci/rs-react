import Person from './Person.tsx';
import {
  createSearchParams,
  Outlet,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ROUTER_PATHS } from '../router/router.tsx';
import { useContext } from 'react';
import { PeopleListContext } from './PeopleListContext.tsx';

const PeopleList = () => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { isLoading, results } = useContext(PeopleListContext);

  const closeDetails = (e: React.MouseEvent<HTMLUListElement>) =>
    e.target === e.currentTarget
      ? navigate({
          pathname: ROUTER_PATHS.root,
          search: createSearchParams(queryParams).toString(),
        })
      : null;

  if (isLoading) return <div>Loading...</div>;
  if (!results.length) return <div>No results</div>;

  return (
    <>
      <ul className="people-list" onClick={closeDetails}>
        {results.map((person) => (
          <Person person={person} key={person.name} />
        ))}
      </ul>
      <Outlet />
    </>
  );
};
export default PeopleList;
