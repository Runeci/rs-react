import { useState } from 'react';
import { START_PAGE } from '../models/const.tsx';
import { useSearchParams } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';
import { changePerPage } from '../store/viewPerPageSlice.tsx';
import { useAppDispatch, useAppSelector } from '../store/redux.tsx';

interface PaginationProps {
  maxAmountOfPages: number;
  queryKey: string;
}

export function Pagination({ maxAmountOfPages, queryKey }: PaginationProps) {
  const dispatch = useAppDispatch();
  const itemsPerPage = useAppSelector(
    (store) => store.viewPerPageReducer.value
  );

  const [queryParams, setQueryParams] = useSearchParams();
  const [currPage, setCurrentPage] = useState<number>(
    Number(queryParams.get(ListQueryParams.Page)) || START_PAGE
  );

  const addQueryParam = (key: string, value: string) => {
    queryParams.set(key, value);
    setQueryParams(queryParams);
  };

  function goToPrevPage() {
    const prevPage = currPage - 1;
    setCurrentPage(prevPage);
    addQueryParam(queryKey, prevPage.toString());
  }

  function goToNextPage() {
    const nextPage = currPage + 1;
    setCurrentPage(nextPage);
    addQueryParam(queryKey, nextPage.toString());
  }

  function addSavePerPageQuery(value: string) {
    addQueryParam(ListQueryParams.ItemsPerPage, value);
    dispatch(changePerPage(value));
  }

  if (maxAmountOfPages <= 1 || !maxAmountOfPages) return null;

  return (
    <div
      className="pagination"
      style={{
        display: 'flex',
        width: '50%',
        gap: '10px',
      }}
    >
      <button onClick={goToPrevPage} disabled={currPage === 1}>
        Prev page
      </button>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          margin: '0 24px',
        }}
        data-testid="pagination-curr-page"
      >
        {currPage}
      </div>
      <button onClick={goToNextPage} disabled={currPage === maxAmountOfPages}>
        Next page
      </button>
      <select
        defaultValue={itemsPerPage}
        onChange={(e) => addSavePerPageQuery(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        Total pages: {maxAmountOfPages}
      </div>
    </div>
  );
}
