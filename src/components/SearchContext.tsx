import { createContext, useState, PropsWithChildren } from 'react';
import { LS_SEARCH } from '../models/const.tsx';
import { ListQueryParams } from '../models/enums.tsx';
import { useSearchParams } from 'react-router-dom';

export const SearchContext = createContext<string>(
  localStorage.getItem(LS_SEARCH) || ''
);

export const UpdateSearchContext = createContext((val: string) => {
  val;
});

export function SearchProvider({ children }: PropsWithChildren) {
  const [search, setSearch] = useState<string>(
    localStorage.getItem(LS_SEARCH) || ''
  );
  const [searchBarParams, setSearchBarParams] = useSearchParams();

  const update = (val: string) => {
    setSearch(val);
    localStorage.setItem(LS_SEARCH, val);
    val
      ? searchBarParams.set(ListQueryParams.Search, val)
      : searchBarParams.delete(ListQueryParams.Search);

    searchBarParams.set(ListQueryParams.Page, '1');
    setSearchBarParams(searchBarParams);
  };

  return (
    <SearchContext.Provider value={search}>
      <UpdateSearchContext.Provider value={update}>
        {children}
      </UpdateSearchContext.Provider>
    </SearchContext.Provider>
  );
}
