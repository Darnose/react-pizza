import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './sass/Pagination.module.scss';
import IPagination from './interface/IPagination';

export const Pagination: React.FC<IPagination> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
