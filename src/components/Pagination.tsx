import { useState } from 'react';
import {} from '../services/SWAPI.tsx';
import { DEFAULT_ITEMS_PER_PAGE, START_PAGE } from '../models/const.tsx';
import { useSearchParams } from 'react-router-dom';
import { ListQueryParams } from '../models/enums.tsx';

interface PaginationProps {
  maxAmountOfPages: number;
  onSetCurrentPage: (curPage: number) => void;
  onSetAmountPerPage: (amount: string) => void;
}

export function Pagination({
  maxAmountOfPages,
  onSetCurrentPage,
  onSetAmountPerPage,
}: PaginationProps) {
  const [queryParams] = useSearchParams();
  const [currPage, setCurrentPage] = useState<number>(
    Number(queryParams.get(ListQueryParams.Page)) ?? START_PAGE
  );
  const itemsPerPage =
    queryParams.get(ListQueryParams.ItemsPerPage) ?? DEFAULT_ITEMS_PER_PAGE;

  function goToPrevPage() {
    const prevPage = currPage - 1;
    setCurrentPage(prevPage);
    onSetCurrentPage(prevPage);
  }

  function goToNextPage() {
    const nextPage = currPage + 1;
    setCurrentPage(nextPage);
    onSetCurrentPage(nextPage);
  }

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
      >
        {currPage}
      </div>
      <button onClick={goToNextPage} disabled={currPage === maxAmountOfPages}>
        Next page
      </button>
      <select
        defaultValue={itemsPerPage}
        onChange={(e) => onSetAmountPerPage(e.target.value)}
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
