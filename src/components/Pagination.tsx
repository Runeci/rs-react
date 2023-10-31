import React from 'react';

interface PaginationProps {
  selectAmount: number;
  currentPage: (value: string) => void;
  page: string;
}

export function Pagination({
  selectAmount,
  currentPage,
  page,
}: PaginationProps) {
  function setCurrentPage(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target as HTMLSelectElement;
    currentPage(target.value);
  }

  return (
    <div className="pagination">
      Pagination
      <select defaultValue={page || '1'} onChange={setCurrentPage}>
        {Array.from(Array(selectAmount).keys()).map((i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
