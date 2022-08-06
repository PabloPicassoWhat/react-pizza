import React from 'react';
import ReactPaginate from "react-paginate";
import {useDispatch} from "react-redux";

import {setCurrentPage} from "../../redux/slices/paginationSlice";

import styles from "./Pagination.module.scss"

const Pagination = ({currentPage}) => {
  const dispatch = useDispatch()

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">>"
      onPageChange={event => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={5}
      pageCount={2}
      forcePage={currentPage - 1}
      previousLabel="<<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;