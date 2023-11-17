import { SWPeople } from '../store/api/apiSlice.tsx';

export const PERSON_MOCK = {
  name: '13',
  gender: '13',
  birth_year: '13',
  height: '13',
  skin_color: '31',
  starships: '31',
  url: 'people/31',
  mass: '13',
  eye_color: '31',
};

export const PEOPLE_MOCK: SWPeople = {
  count: 2,
  results: [
    {
      name: '1',
      gender: '1',
      birth_year: '1',
      height: '1',
      skin_color: '1',
      starships: '1',
      url: 'people/1',
      mass: '1',
      eye_color: '1',
    },
    {
      name: '2',
      gender: '2',
      birth_year: '2',
      height: '2',
      skin_color: '2',
      starships: '2',
      url: '2',
      mass: '2',
      eye_color: '2',
    },
  ],
};
