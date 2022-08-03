import React, {useEffect, useState} from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://62e8ff67249bb1284eb82257.mockapi.io/items')
      .then(response => response.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
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