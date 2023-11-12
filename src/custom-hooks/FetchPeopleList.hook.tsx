import { SWAPI } from '../services/SWAPI.tsx';
import { useContext, useEffect } from 'react';
import {
  PeopleContext,
  PeopleDispatchContext,
  PeopleListContext,
} from '../components/PeopleListContext.tsx';
import { useSearchParams } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';
import {
  DEFAULT_ITEMS_PER_PAGE,
  LS_SEARCH,
  PEOPLE_LIST_CONTEXT_DEFAULT,
  START_PAGE,
} from '../models/const.tsx';

export function useFetchPeopleList() {
  const SWAPIService = new SWAPI();
  const peopleData = useContext(PeopleListContext);
  const setPeopleData = useContext(PeopleDispatchContext);
  const [searchBarParams] = useSearchParams();

  const getQueryParam = (key: ListQueryParams) => searchBarParams.get(key);

  const resetPeopleData = () => {
    setPeopleData!({
      ...PEOPLE_LIST_CONTEXT_DEFAULT,
      maxPageAmount: peopleData.maxPageAmount,
    });
  };

  const updatePeopleData = (data: Partial<PeopleContext>) => {
    const newData = { ...peopleData, ...data };
    setPeopleData!(newData);
  };

  useEffect(() => {
    resetPeopleData();

    async function fetchData() {
      const searchValue =
        getQueryParam(ListQueryParams.Search) ||
        localStorage.getItem(LS_SEARCH) ||
        '';
      const pageValue =
        getQueryParam(ListQueryParams.Page) || START_PAGE.toString();
      const perPage =
        getQueryParam(ListQueryParams.ItemsPerPage) ||
        DEFAULT_ITEMS_PER_PAGE.toString();

      await SWAPIService.getSWPeople(searchValue, pageValue)
        .then((res) => {
          const newData =
            perPage === '5'
              ? {
                  results: res.results.splice(0, 5),
                  maxPageAmount: Math.ceil(res.count / DEFAULT_ITEMS_PER_PAGE),
                }
              : {
                  results: res.results,
                  maxPageAmount: Math.ceil(res.count / DEFAULT_ITEMS_PER_PAGE),
                };
          updatePeopleData({
            ...newData,
            isLoading: false,
          });
        })
        .catch(() => updatePeopleData({ isLoading: false }));
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBarParams]);
  return peopleData;
}
