import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = ({searchValue}) => {
  const {categoryId, sortPosition, popupSort, selectSortItem} = useSelector(state => state.filter)
  const {currentPage} = useSelector(state => state.pagination)

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const category = !categoryId ? "" : `category=${categoryId}`
    const sortBy = selectSortItem.sortType
    const order = !sortPosition ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''

    setIsLoading(true)
    axios.get(`https://62e8ff67249bb1284eb82257.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setItems(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, selectSortItem, searchValue, currentPage])

  const skeleton = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i}/>)
  const pizzaElement = items.map((item) => <PizzaBlock key={item.id} {...item}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories valueCategory={categoryId}/>
        <Sort
          popupSort={popupSort}
          selectItem={selectSortItem}
          sortPosition={sortPosition}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeleton
          : pizzaElement
        }
      </div>
      <Pagination currentPage={currentPage}/>
    </div>
  );
};

export default Home;