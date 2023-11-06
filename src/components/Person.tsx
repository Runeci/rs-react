import { SWPerson } from '../services/SWAPI.tsx';
import { useNavigate } from 'react-router-dom';

interface PersonProps {
  person: SWPerson;
}

const Person = ({ person }: PersonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const id = person.url.split('people/')[1].replace(/\//g, '');
    navigate(`detail/${id}`);
  };
  return (
    <div
      style={{
        border: '1px solid white',
        borderRadius: '8px',
      }}
    >
      <div style={{ cursor: 'pointer' }} onClick={handleClick}>
        {/*<NavLink*/}
        {/*  to={`detail/${person.url.split('people/')[1].replace(/\//g, '')}`}*/}
        {/*>*/}
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
        {/*</NavLink>*/}
      </div>
    </div>
  );
};

export default Person;
