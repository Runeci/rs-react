import { SWPeople } from '../services/SWAPI.tsx';
import Person from './Person.tsx';

export interface PeopleListProps {
  peopleList: SWPeople['results'];
}

const PeopleList = ({ peopleList }: PeopleListProps) => {
  return (
    <>
      <ul className="people-list">
        {peopleList.map((person) => (
          <Person person={person} key={person.name} />
        ))}
      </ul>
    </>
  );
};

export default PeopleList;
