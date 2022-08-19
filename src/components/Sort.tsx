import React, {FC, memo, useCallback} from 'react';
import {useDispatch} from "react-redux";

import {setPopupSort, setSelectSortItem, setSortPosition} from "../redux/filter/slice";
import {SortItem} from "../redux/filter/types";
import {SortProps} from "./types";

export const arrList: SortItem[] = [
  {name: 'популярности', sortType: 'rating'},
  {name: 'цене', sortType: 'price'},
  {name: 'алфавиту', sortType: 'title'}
]

const Sort: FC<SortProps> = ({selectItem, sortPosition, popupSort}) => {
  const dispatch = useDispatch()

  const onClickItem = useCallback((obj: SortItem) => {
    dispatch(setSelectSortItem(obj))
    dispatch(setPopupSort(false))
  }, [dispatch])

  const sortPositionDispatch = useCallback(() => {
    dispatch(setSortPosition(!sortPosition))
  }, [dispatch, sortPosition])

  const onClickPopupSort = useCallback(() => {
    dispatch(setPopupSort(!popupSort))
  }, [dispatch, popupSort])

  const onPointerLeavePopupSort = useCallback(() => {
    dispatch(setPopupSort(false))
  }, [dispatch])

  const trianglePopup = useCallback(() =>  popupSort
      ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fillRule="evenodd" d="M12 11L6 5l-6 6h12z"/></svg>
      : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fillRule="evenodd" d="M0 5l6 6 6-6H0z"/></svg>
    , [popupSort])

  const triangleSortPosition = useCallback(() =>  sortPosition
      ? <svg onClick={sortPositionDispatch} xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fillRule="evenodd" d="M0 5l6 6 6-6H0z"/></svg>
      : <svg onClick={sortPositionDispatch} xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fillRule="evenodd" d="M12 11L6 5l-6 6h12z"/></svg>
    , [sortPosition, sortPositionDispatch])

  return (
    <div className="sort">
      <div className="sort__label">
        {trianglePopup()}
        <b>Сортировка по:</b>
        <span onClick={onClickPopupSort}>{selectItem?.name}</span>
      </div>
      {popupSort && (
        <div onPointerLeave={onPointerLeavePopupSort} className="sort__popup">
          <ul>
            {arrList.map((obj) => (
              <li key={obj.name} onClick={() => onClickItem(obj)} className={selectItem?.name === obj.name ? "active" : ""}>
                {triangleSortPosition()} {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(Sort);