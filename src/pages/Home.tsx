import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {setFilters, SortItem} from "../redux/slices/filterSlice";
import {setPage} from "../redux/slices/paginationSlice";
import {fetchPizzas} from "../redux/slices/pizzaSlice";

import {Categories, Sort, PizzaSkeleton, PizzaBlock, Pagination} from "../components";
import { arrList } from "../components/Sort"
import {RootState, useAppDispatch} from "../redux/store";

export type FilterType = {
  categoryId: string
  currentPage: string
  sortType: string
  selectSortItem: SortItem
}

const Home: React.FC = () => {
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {currentPage} = useSelector((state: RootState) => state.pagination)
  const {items, status} = useSelector((state: RootState) => state.pizza)
  const {categoryId, sortPosition, popupSort, selectSortItem, searchValue} = useSelector((state: RootState) => state.filter)

  const getPizzas = () => {
    const category = !categoryId ? "" : `category=${categoryId}`
    const sortBy = selectSortItem.sortType
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
      const selectSortItem = arrList.find(obj => obj.sortType === params.sortType) as SortItem

      dispatch(
        setFilters({
        ...params, selectSortItem
          } as FilterType)
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
      getPizzas()
    }
    isSearch.current = false
  }, [categoryId, selectSortItem, searchValue, currentPage, sortPosition])

  const skeleton = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i}/>)
  const pizzaElement = items.map((item: any) => <PizzaBlock key={item.id} {...item}/>)

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
      {status === 'error'
        ? (
          <div className="content__error-info">
            <h2>Произошла ошибка при загрузке страницы 😕</h2>
            <p>Попробуйте повторить попытку позже.</p>
          </div>
        )
        : (
          <>
            <div className="content__items">
              {status === 'loading'
                ? skeleton
                : pizzaElement
              }
            </div>
            <Pagination currentPage={currentPage}/>
          </>
        )
      }
    </div>
  );
};

export default Home;