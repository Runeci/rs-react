import { useEffect, useState } from 'react';
import { DEFAULT_ITEMS_PER_PAGE } from '../services/SWAPI.tsx';

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
  const [currPage, setCurrentPage] = useState<number>(1);

  function goToPrevPage() {
    if (currPage === 1) return;
    const prevPage = currPage - 1;
    setCurrentPage(prevPage);
    onSetCurrentPage(currPage);
  }

  function goToNextPage() {
    if (currPage === maxAmountOfPages) return;
    const nextPage = currPage + 1;
    setCurrentPage(nextPage);
    onSetCurrentPage(nextPage);
  }

  useEffect(() => {
    return () => {
      setCurrentPage(1);
    };
  }, []);

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
        defaultValue={DEFAULT_ITEMS_PER_PAGE}
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
