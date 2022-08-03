import React, {useEffect, useState} from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setActiveCategory] = useState(0)
  const [selectSortItem, setSelectSortItem] = useState({name: 'популярности', sortType: 'rating'})
  const [sortPosition, setSortPosition] = useState(false)

  const category = !categoryId ? "" : categoryId
  const sortBy = selectSortItem.sortType
  const order = !sortPosition ? 'asc' : 'desc'

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://62e8ff67249bb1284eb82257.mockapi.io/items?category=${category}&sortBy=${sortBy}&order=${order}`)
      .then(response => response.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, selectSortItem])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          valueCategory={categoryId}
          onClickCategory={(i) => setActiveCategory(i)}
        />
        <Sort
          selectItem={selectSortItem}
          setSelectItem={setSelectSortItem}
          sortPosition={sortPosition}
          setSortPosition={setSortPosition}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, i) => <PizzaSkeleton key={i}/>)
          : items.map((item) => <PizzaBlock key={item.id} {...item}/>)}
      </div>
    </div>
  );
};

export default Home;