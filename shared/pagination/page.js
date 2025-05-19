import React from "react";
import styles from "./pagination.module.scss";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  const rowsOptions = [10, 20, 30, 40, 50];

  // Calculate the starting and ending index of the items for the current page
  const startIndex = (currentPage - 1) * rowsPerPage + 1; // 1-based index
  const endIndex = Math.min(currentPage * rowsPerPage, totalPages);

  return (
    <div className={styles.pagination}>
      <div className={styles.rowsPerPage}>
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          {rowsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.pageNavigation}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          type="button"
        >
          &lt;
        </button>
        <span>{`${startIndex}-${endIndex} of ${totalPages}`}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage * rowsPerPage >= totalPages}
          type="button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
