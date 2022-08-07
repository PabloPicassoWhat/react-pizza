import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {setFilters} from "../redux/slices/filterSlice";
import {setPage} from "../redux/slices/paginationSlice";

import {Categories, Sort, PizzaSkeleton, PizzaBlock, Pagination} from "../components";
import { arrList } from "../components/Sort"

const Home = ({searchValue}) => {
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {currentPage} = useSelector(state => state.pagination)
  const {categoryId, sortPosition, popupSort, selectSortItem} = useSelector(state => state.filter)

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPizzas = () => {
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
  }

  // if the parameters were changed and there was a first render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: selectSortItem.sortType,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, selectSortItem, currentPage])

  // if there was a first render, then the parameters of the URL are sewn into the redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = arrList.find(obj => obj.sortType === params.sortType)

      dispatch(
        setFilters({
          ...params, sort
          })
      )
      dispatch(setPage({
        ...params
        })
      )
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
  }, [categoryId, selectSortItem, searchValue, currentPage, sortPosition])

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