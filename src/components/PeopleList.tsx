import { SWPeople } from '../services/SWAPI.tsx';
import Person from './Person.tsx';

export interface PeopleListProps {
  peopleList: SWPeople['results'];
}

const PeopleList = ({ peopleList }: PeopleListProps) => {
  return (
    <>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr)',
          gap: '24px',
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
