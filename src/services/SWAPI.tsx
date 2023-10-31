export const API_URL = 'https://swapi.dev/api/people/';

export interface SWPeople {
  count: number;
  results: SWPerson[];
}

export interface SWPerson {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
  skin_color: string;
}

export class SWAPI {
  async getSWPeople(search: string, page: string): Promise<SWPeople> {
    const url = search ? `?page=${page}&search=` + search : `?page=${page}`;
    const response = await fetch(API_URL + url);
    return (await response.json()) as SWPeople;
  }
}
