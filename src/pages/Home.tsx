import React, {FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {always, find, ifElse, prop, propEq} from "ramda"
import qs from "qs";

import {AppDispatch, RootState} from "../redux/store";
import {setFilters} from "../redux/filter/slice";
import {setPage} from "../redux/pagination/slice";
import {fetchPizzas} from "../redux/pizza/slice";
import {selectFilter} from "../redux/filter/selectors";
import {selectPagination} from "../redux/pagination/selectors";
import {selectPizza} from "../redux/pizza/selectors";
import {SortItem} from "../redux/filter/types";
import {IContent} from "./types";
import {setIsMount} from "../redux/mount/slice"

import {Categories, Pagination, PizzaBlock, PizzaSkeleton, Sort} from "../components";
import {arrList} from "../components/Sort"
import {FAKE_ARR} from "../constant";
import {log} from "util";

// const renderMainContent = ifElse<IContent[], ReactNode, ReactNode>(
//   propEq("status", 'loading'),
//   prop("skeleton"),
//   prop("pizzaElement")
// )

// const render = ifElse<IContent[], ReactNode, ReactNode>(
//   ({status}) => equals(status, "loading"),
//   ({skeleton}) => skeleton,
//   ({pizzaElement}) => pizzaElement
// )

const renderContent = ifElse<IContent[], ReactNode, ReactNode>(
  propEq("status", "error"),
    always(
      <div className="content__error-info">
        <h2>Произошла ошибка при загрузке страницы 😕</h2>
        <p>Попробуйте повторить попытку позже.</p>
      </div>),
  ({items, currentPage, status}) => (
    <>
      <div className="content__items">
        {/*{renderMainContent({skeleton, pizzaElement, status})}*/}
        {items.map((item) => <PizzaBlock key={item.id} {...item}/>)}
      </div>
      <Pagination currentPage={currentPage}/>
    </>
  )
)

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const [isMount, setIsMount] = useState(false)
  const navigate = useNavigate()
  const isSearch = useRef(false)
  // const isMounted = useRef(false)

  const isMount = useSelector((state: RootState) => state.mount)
  const {currentPage} = useSelector(selectPagination)
  const {items, status} = useSelector(selectPizza)
  const { sortPosition, categoryId, popupSort, selectSortItem, searchValue} =
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

  // if the parameters were changed and there was a first render
  useEffect(() => {
    if (isMount) {
      const queryString = qs.stringify({
        sortType: selectSortItem?.sortType,
        categoryId,
        currentPage,
      })
      // navigate(`?${queryString}`)
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

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) getPizzas()

    isSearch.current = false
  }, [getPizzas])

  // const skeleton = useMemo(() => FAKE_ARR.map((_, i) => <PizzaSkeleton key={i}/>), [])
  // const pizzaElement = useMemo( () => items.map((item) => <PizzaBlock key={item.id} {...item}/>), [items])

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
      {/*{renderContent({status, skeleton, pizzaElement, currentPage})}*/}
      {renderContent({items, status, currentPage})}
    </div>
  );
};

export default memo(Home);