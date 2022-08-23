import React, {FC, ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {always, find, equals, propEq, cond} from "ramda"
import qs from "qs";

import {Typography, Tabs, Result} from "antd";

import {AppDispatch, RootState} from "../redux/store";
import {setFilters} from "../redux/filter/slice";
import {setPage} from "../redux/pagination/slice";
import {fetchPizzas} from "../redux/pizza/slice";
import {selectCategoryName, selectFilter} from "../redux/filter/selectors";
import {selectPagination} from "../redux/pagination/selectors";
import {selectPizza} from "../redux/pizza/selectors";
import {SortItem} from "../redux/filter/types";
import {IContent} from "./types";
import {setIsMount} from "../redux/mount/slice"

import {Categories, Pagination, PizzaBlock, Sort} from "../components";
import {arrList} from "../components/Sort"
import TableItems from "../components/Table/TableItems";
import Loader from "../components/Loader/Loader";
import {Status} from "../redux/pizza/types";

// const renderMainContent = ifElse<IContent[], ReactNode, ReactNode>(
//   propEq("status", 'loading'),
//   prop("skeleton"),
//   prop("pizzaElement")
// )

// const render = ifElse<IContent[], ReactNode, ReactNode>(
//   ({status}) => equals(status, "loading"),
//   () => <Loader/>,
//   ({pizzaElement}) => pizzaElement
// )

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

  const isMount = useSelector((state: RootState) => state.mount)
  const {currentPage} = useSelector(selectPagination)
  const {items, status} = useSelector(selectPizza)
  const categoryName = useSelector(selectCategoryName)
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

  const arrTab = useMemo(() => [
    {
      tabName: 'Home',
      key: "1",
      childComponent: equals(status, Status.LOADING) ? <Loader/> : renderContent({status, currentPage, items})
    },
    {
      tabName: 'Table',
      key: "2",
      childComponent: <TableItems/>
    }
  ], [status, currentPage, items])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort
          popupSort={popupSort}
          selectItem={selectSortItem}
          sortPosition={sortPosition}
        />
      </div>
      <Typography.Title level={2} className="content__title">{categoryName} пиццы</Typography.Title>
      <Tabs defaultActiveKey="1">
        {arrTab.map(item => <Tabs.TabPane key={item.key} tab={item.tabName}>{item.childComponent}</Tabs.TabPane>)}
      </Tabs>
    </div>
  );
};

export default Home;