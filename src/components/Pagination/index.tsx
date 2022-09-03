import React, {FC, useCallback} from 'react';
import ReactPaginate from "react-paginate";
import {useDispatch} from "react-redux";

import { Pagination as PaginationAnt } from 'antd';

import {setCurrentPage} from "../../redux/pagination/slice";

import styles from "./Pagination.module.scss"

type PaginationProps = {
  currentPage?: number
}

const Pagination: FC<PaginationProps> = ({currentPage}) => {
  const dispatch = useDispatch()

  const onChangePage = useCallback((page: number) => dispatch(setCurrentPage(page)), [])

  return (
    <PaginationAnt current={currentPage} onChange={onChangePage} total={20}/>
    // <ReactPaginate
    //   className={styles.root}
    //   breakLabel="..."
    //   nextLabel=">>"
    //   onPageChange={event => dispatch(setCurrentPage(event.selected + 1))}
    //   pageRangeDisplayed={5}
    //   pageCount={2}
    //   forcePage={Number(currentPage) - 1}
    //   previousLabel="<<"
    // />
  );
};

export default Pagination;