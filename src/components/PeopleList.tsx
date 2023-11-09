import { SWPeople } from '../services/SWAPI.tsx';
import Person from './Person.tsx';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ROUTER_PATHS } from '../main.tsx';

export interface PeopleListProps {
  peopleList: SWPeople['results'];
}

const PeopleList = ({ peopleList }: PeopleListProps) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const closeDetails = (e: React.MouseEvent<HTMLUListElement>) =>
    e.target === e.currentTarget
      ? navigate({
          pathname: ROUTER_PATHS.root,
          search: createSearchParams(queryParams).toString(),
        })
      : null;

  return (
    <>
      <ul
        onClick={closeDetails}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr)',
          gap: '24px',
          border: '1px solid white',
          padding: '10px',
        }}
      >
        {peopleList.map((person) => (
          <Person person={person} key={person.name} />
        ))}
      </ul>
    </>
  );
};
export default PeopleList;
