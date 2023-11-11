import {
  createContext,
  SetStateAction,
  Dispatch,
  PropsWithChildren,
  useState,
} from 'react';
import { SWPeople } from '../services/SWAPI.tsx';
import { PEOPLE_LIST_CONTEXT_DEFAULT } from '../models/const.tsx';

export interface PeopleContext {
  results: SWPeople['results'];
  isLoading: boolean;
  maxPageAmount: number;
}

export const PeopleListContext = createContext<PeopleContext>(
  PEOPLE_LIST_CONTEXT_DEFAULT
);
export const PeopleDispatchContext = createContext<Dispatch<
  SetStateAction<PeopleContext>
> | null>(null);

export default function PeopleProvider({ children }: PropsWithChildren) {
  const [peopleData, setPeopleData] = useState<PeopleContext>(
    PEOPLE_LIST_CONTEXT_DEFAULT
  );

  return (
    <PeopleListContext.Provider value={peopleData}>
      <PeopleDispatchContext.Provider value={setPeopleData}>
        {children}
      </PeopleDispatchContext.Provider>
    </PeopleListContext.Provider>
  );
}
