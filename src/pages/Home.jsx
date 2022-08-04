import React, {useEffect, useState} from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = ({searchValue}) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setActiveCategory] = useState(0)
  const [selectSortItem, setSelectSortItem] = useState({name: 'популярности', sortType: 'rating'})
  const [sortPosition, setSortPosition] = useState(false)
  const [popupSort, setPopupSort] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const category = !categoryId ? "" : `category=${categoryId}`
  const sortBy = selectSortItem.sortType
  const order = !sortPosition ? 'asc' : 'desc'
  const search = searchValue ? `&search=${searchValue}` : ''

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://62e8ff67249bb1284eb82257.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(response => response.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, selectSortItem, searchValue, currentPage])

  const skeleton = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i}/>)
  const pizzaElement = items.map((item) => <PizzaBlock key={item.id} {...item}/>)

  return (
    <div onPointerLeave={() => setPopupSort(false)} className="container">
      <div className="content__top">
        <Categories
          valueCategory={categoryId}
          onClickCategory={(i) => setActiveCategory(i)}
        />
        <Sort
          popupSort={popupSort}
          setPopupSort={setPopupSort}
          selectItem={selectSortItem}
          setSelectItem={setSelectSortItem}
          sortPosition={sortPosition}
          setSortPosition={setSortPosition}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeleton
          : pizzaElement
        }
      </div>
      <Pagination setCurrentPage={setCurrentPage}/>
    </div>
  );
};

export default Home;