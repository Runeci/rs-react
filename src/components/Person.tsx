import { SWPerson } from '../services/SWAPI.tsx';

interface PersonProps {
  person: SWPerson;
}

const Person = ({ person }: PersonProps) => {
  return (
    <div
      style={{
        border: '1px solid white',
        borderRadius: '8px',
      }}
    >
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
  );
};

export default Person;
