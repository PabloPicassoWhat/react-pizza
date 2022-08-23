import React, {FC, useCallback} from 'react';

import {Table} from "antd";

import {useSelector} from "react-redux";
import {selectPizzaItems} from "../../redux/pizza/selectors";
import {Pizza} from "../../redux/pizza/types";
import {columns} from "../../dictionaries";

const TableItems: FC = () => {
  const items = useSelector(selectPizzaItems)

  const getRowId = useCallback((item: Pizza) => item.id, [])

  return <Table rowKey={getRowId} pagination={false} columns={columns} dataSource={items}/>
};

export default TableItems;