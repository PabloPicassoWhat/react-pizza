import React, {FC, useCallback} from 'react';

import {Table} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {selectPizza, selectPizzaItems} from "../../redux/pizza/selectors";
import {Pizza, Status} from "../../redux/pizza/types";
import {columns} from "../../dictionaries";
import {selectPagination} from "../../redux/pagination/selectors";
import {setCurrentPage} from "../../redux/pagination/slice";

const TableItems: FC = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectPizzaItems)
  const {status} = useSelector(selectPizza)
  const {currentPage} = useSelector(selectPagination)

  const onChangePage = useCallback((page: number) => dispatch(setCurrentPage(page)), [])

  const getRowId = useCallback((item: Pizza) => item.id, [])

  return <Table
    loading={status === Status.LOADING && {size: 'small'}}
    rowKey={getRowId}
    pagination={{total: 20, current: currentPage, onChange: onChangePage}}
    columns={columns} dataSource={items}/>
};

export default TableItems;