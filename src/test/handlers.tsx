import { http, HttpResponse } from 'msw';
import { API_URL } from '../store/api/apiSlice.tsx';
import { PEOPLE_MOCK, PERSON_MOCK } from '../models/mock.const.tsx';

export const handlers = [
  http.get(API_URL, () => HttpResponse.json(PEOPLE_MOCK)),
  http.get(`${API_URL}:id`, () => HttpResponse.json(PERSON_MOCK)),
];
