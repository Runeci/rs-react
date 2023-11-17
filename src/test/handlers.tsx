import { http, HttpResponse } from 'msw';
import { API_URL } from '../services/apiSlice.tsx';
import { PEOPLE_MOCK, PERSON_MOCK } from '../models/mock.const.tsx';

export const handlers = [
  http.get(API_URL, () => {
    console.log('fe');
    return HttpResponse.json(PEOPLE_MOCK);
  }),
  http.get('https://swapi.dev/api/people/:id', () => {
    // const { id } = req.params;
    console.log('fefefefefe');

    return HttpResponse.json(PERSON_MOCK);
  }),
];
