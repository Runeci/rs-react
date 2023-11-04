import { SWPeople } from '../services/SWAPI.tsx';
import Person from './Person.tsx';
import { NavLink } from 'react-router-dom';

export interface PeopleListProps {
  peopleList: SWPeople['results'];
}

const PeopleList = ({ peopleList }: PeopleListProps) => {
  return (
    <>
      <NavLink to={'/'}>
        <ul
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
      </NavLink>
    </>
  );
};

export default PeopleList;
