import { SWPerson } from '../services/SWAPI.tsx';
import { NavLink } from 'react-router-dom';
import React from 'react';

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
      <NavLink
        to={`detail/${person.url.split('people/')[1].replace(/\//g, '')}`}
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
      </NavLink>
    </div>
  );
};

export default Person;
