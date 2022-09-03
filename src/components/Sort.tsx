import React, {FC, useCallback, useMemo} from 'react';
import {useDispatch} from "react-redux";

import {setSelectSortItem, setSortPosition} from "../redux/filter/slice";
import {SortItem} from "../redux/filter/types";
import {SortProps} from "./types";

import {Dropdown, Menu, Space} from "antd";
import {CaretDownOutlined, CaretUpOutlined, DownOutlined} from "@ant-design/icons/lib";

export const arrList: SortItem[] = [
  {name: 'популярности', sortType: 'rating'},
  {name: 'цене', sortType: 'price'},
  {name: 'алфавиту', sortType: 'title'}
]

const Sort: FC<SortProps> = ({selectItem, sortPosition}) => {
  const dispatch = useDispatch()

  const onClickItem = useCallback((obj: SortItem) => {
    dispatch(setSelectSortItem(obj))
  }, [])

  const sortPositionDispatch = useCallback(() => {
    dispatch(setSortPosition(!sortPosition))
  }, [dispatch, sortPosition])

  const triangleSortPosition = useMemo(() => sortPosition
      ? <CaretDownOutlined onClick={sortPositionDispatch} />
      : <CaretUpOutlined onClick={sortPositionDispatch} />, [sortPosition])

  const newArrList = useMemo(() => arrList.map((obj, idx) => (
    {...obj, key: idx + 1, label: <span onClick={() => onClickItem(obj)}>{obj.name}</span>, icon: triangleSortPosition}
    )), [sortPosition])

  const menu = <Menu items={newArrList} />

  return (
    <div className="sort">
      <div className="sort__label">
        <Dropdown overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              Сортировать по
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sort;