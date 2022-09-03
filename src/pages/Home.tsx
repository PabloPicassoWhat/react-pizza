import React, {FC, ReactNode, useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {always, find, equals, propEq, cond} from "ramda"
import qs from "qs";

import {Typography, Result} from "antd";

import {AppDispatch} from "../redux/store";
import {setFilters} from "../redux/filter/slice";
import {setPage} from "../redux/pagination/slice";
import {fetchPizzas} from "../redux/pizza/slice";
import {setIsMount} from "../redux/mount/slice"
import {selectCategoryName, selectFilter} from "../redux/filter/selectors";
import {selectPagination} from "../redux/pagination/selectors";
import {selectPizza} from "../redux/pizza/selectors";
import {selectMount} from "../redux/mount/selectors";

import {Categories, Pagination, PizzaBlock, Sort} from "../components";
import {IContent} from "./types";
import {SortItem} from "../redux/filter/types";
import {Status} from "../redux/pizza/types";
import Loader from "../components/Loader/Loader";
import {arrList} from "../components/Sort"

const renderContent = cond<IContent[], ReactNode>([
  [propEq("status", Status.ERROR), always(<Result status="warning" title="Произошла ошибка при загрузке страницы"/>)],
  [propEq("status", Status.EMPTY), always(<Result status="info" title="Список пуст"/>)],
  [propEq("status", Status.SUCCESS), ({currentPage, items}) => (
    <>
      <div className="content__items">
        {items.map((item) => <PizzaBlock key={item.id} {...item}/>)}
      </div>
      <Pagination currentPage={currentPage}/>
    </>
  )]
])

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const isSearch = useRef(false)

  const isMount = useSelector(selectMount)
  const {currentPage} = useSelector(selectPagination)
  const {items, status} = useSelector(selectPizza)
  const categoryName = useSelector(selectCategoryName)
  const { sortPosition, categoryId, selectSortItem, searchValue} =
    useSelector(selectFilter)

  const getPizzas = useCallback(() => {
    const category = !categoryId ? "" : `category=${categoryId}`
    const sortBy = selectSortItem?.sortType
    const order = !sortPosition ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage
      })
    )
  }, [categoryId, sortPosition, selectSortItem, searchValue, currentPage, dispatch])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) getPizzas()
    isSearch.current = false
  }, [getPizzas])

  // if the parameters were changed and there was a first render
  useEffect(() => {
    if (isMount) {
      const queryString = qs.stringify({
        sortType: selectSortItem?.sortType,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    dispatch(setIsMount(true))
  }, [categoryId, selectSortItem, currentPage, navigate])

  // if there was a first render, then the parameters of the URL are sewn into the redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      // const selectSortItem = arrList?.find(propEq("sortType", params.sortType))
      const selectSortItem = find<SortItem>(propEq("sortType", params.sortType))(arrList)

      dispatch(setFilters({...params, selectSortItem}))
      dispatch(setPage({...params}))
      isSearch.current = true
    }
  }, [dispatch])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort
          selectItem={selectSortItem}
          sortPosition={sortPosition}
        />
      </div>
      <Typography.Title level={2} className="content__title">{categoryName} пиццы</Typography.Title>
      {equals(status, Status.LOADING) ? <Loader/> : renderContent({status, currentPage, items})}
    </div>
  );
};

export default Home;