import { SWPerson } from '../services/SWAPI.tsx';

interface PersonProps {
  person: SWPerson;
}

const Person = ({ person }: PersonProps) => {
  return (
    <div>
      <h1>{person.name}</h1>
      <p>Height: {person.height}</p>
      <p>Gender: {person.gender}</p>
      <p>Birth year: {person.birth_year}</p>
    </div>
  );
};

export default Person;
