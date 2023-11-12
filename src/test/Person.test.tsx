import { beforeEach, describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Person from '../components/Person.tsx';

import { PERSON_MOCK } from '../models/mock.const.tsx';

//Ensure that the card component renders the relevant card data;
describe('Person.tsx', () => {
  beforeEach(() => {
    render(<Person person={PERSON_MOCK} />, {
      wrapper: BrowserRouter,
    });
  });

  it('should display correctly person name in detail view', () => {
    const text = screen.getByTestId('person-name').innerHTML;
    expect(text).toBe(PERSON_MOCK.name);
  });

  it('should display correctly person birth year in detail view', () => {
    const text = screen.getByTestId('person-birth-year').innerHTML;
    expect(text).toBe(PERSON_MOCK.birth_year);
  });

  it('should display correctly person gender in detail view', () => {
    const text = screen.getByTestId('person-gender').innerHTML;
    expect(text).toBe('ef');
  });

  it('should display correctly person height in detail view', () => {
    const text = screen.getByTestId('person-height').innerHTML;
    expect(text).toBe(PERSON_MOCK.birth_year);
  });

  it('should change route on person card click', () => {
    const container = screen.getByTestId('person-container');
    fireEvent.click(container);
    expect(global.window.location.pathname).toContain('detail/31');
  });
});
