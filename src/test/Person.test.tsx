import { beforeEach, describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SWPerson } from '../services/SWAPI.tsx';
import { BrowserRouter } from 'react-router-dom';
import Person from '../components/Person.tsx';

const mockPerson: SWPerson = {
  name: 'string',
  gender: 'string',
  birth_year: 'string',
  height: 'string',
  skin_color: 'string',
  starships: 'string',
  url: '/people/2',
  mass: 'string',
  eye_color: 'string',
};

describe('Person.tsx', () => {
  beforeEach(() => {
    render(<Person person={mockPerson} />, {
      wrapper: BrowserRouter,
    });
  });

  it('should display correctly person name in detail view', () => {
    const text = screen.getByTestId('person-name').innerHTML;
    expect(text).toBe(mockPerson.name);
  });

  it('should display correctly person birth year in detail view', () => {
    const text = screen.getByTestId('person-birth-year').innerHTML;
    expect(text).toBe(mockPerson.birth_year);
  });

  it('should display correctly person gender in detail view', () => {
    const text = screen.getByTestId('person-gender').innerHTML;
    expect(text).toBe(mockPerson.birth_year);
  });

  it('should display correctly person height in detail view', () => {
    const text = screen.getByTestId('person-height').innerHTML;
    expect(text).toBe(mockPerson.birth_year);
  });

  it('should change route on click', () => {
    const container = screen.getByTestId('person-container');
    fireEvent.click(container);
    expect(global.window.location.pathname).toContain('/2');
  });
});
