import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ROUTER_PATHS } from '../router/router.tsx';
import { SWPerson } from '../services/apiSlice.tsx';

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
      <div
        data-testid="person-container"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        <h2 data-testid="person-name">{person.name}</h2>
        <p>
          <b>Height:</b>
          <span data-testid="person-height">{person.height}</span>
        </p>
        <p>
          <b>Gender:</b>
          <span data-testid="person-gender">{person.gender}</span>
        </p>
        <p>
          <b>Birth year:</b>
          <span data-testid="person-birth-year">{person.birth_year}</span>
        </p>
      </div>
    </div>
  );
};

export default Person;
