import React, {useState} from 'react';

const Sort = ({selectItem, setSelectItem, setSortPosition, sortPosition, popupSort, setPopupSort}) => {
  const arrList = [
    {name: 'популярности', sortType: 'rating'},
    {name: 'цене', sortType: 'price'},
    {name: 'алфавиту', sortType: 'title'}
  ]

  const onClickItem = (obj) => {
    setSelectItem(obj)
    setPopupSort(false)
  }

  return (
    <div className="sort">
      <div className="sort__label">
        {!popupSort
          ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fillRule="evenodd" d="M0 5l6 6 6-6H0z"/></svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fillRule="evenodd" d="M12 11L6 5l-6 6h12z"/></svg>
        }
        <b>Сортировка по:</b>
        <span onClick={() => setPopupSort(!popupSort)}>{selectItem.name}</span>
      </div>
      {popupSort && (
        <div className="sort__popup">
          <ul>
            {arrList.map((obj) => (
              <li key={obj.name} onClick={() => onClickItem(obj)} className={selectItem.name === obj.name ? "active" : ""}>
                {sortPosition
                  ? <svg onClick={() => setSortPosition(!sortPosition)} xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fillRule="evenodd" d="M0 5l6 6 6-6H0z"/></svg>
                  : <svg onClick={() => setSortPosition(!sortPosition)} xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fillRule="evenodd" d="M12 11L6 5l-6 6h12z"/></svg>
                } {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;