import React from 'react';

interface PaginationProps {
  selectAmount: number;
  currentPage: (value: string) => void;
}

export function Pagination({ selectAmount, currentPage }: PaginationProps) {
  function setCurrentPage(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target as HTMLSelectElement;
    console.log(1, target.value);
    currentPage(target.value);
  }
  return (
    <div className="pagination">
      Pagination
      <select defaultValue="1" onChange={setCurrentPage}>
        {Array.from(Array(selectAmount).keys()).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
}
