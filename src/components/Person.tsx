import { SWPerson } from '../services/SWAPI.tsx';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ROUTER_PATHS } from '../main.tsx';

interface PersonProps {
  person: SWPerson;
}

const Person = ({ person }: PersonProps) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleClick = () => {
    const id = person.url.split('people/')[1].replace(/\//g, '');
    navigate({
      pathname: `${ROUTER_PATHS.detail}/${id}`,
      search: createSearchParams(params).toString(),
    });
  };

  return (
    <div
      style={{
        border: '1px solid white',
        borderRadius: '8px',
      }}
    >
      <div style={{ cursor: 'pointer' }} onClick={handleClick}>
        <h2>{person.name}</h2>
        <p>
          <b>Height:</b> {person.height}
        </p>
        <p>
          <b>Gender:</b> {person.gender}
        </p>
        <p>
          <b>Birth year:</b> {person.birth_year}
        </p>
      </div>
    </div>
  );
};

export default Person;
