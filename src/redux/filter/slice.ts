import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {FilterSliceState, SortItem} from "./types";
import {FilterType} from "../../pages/types";

const initialState: FilterSliceState = {
  categoryId: 0,
  categoryName: 'Все',
  searchValue: '',
  selectSortItem: {name: 'популярности', sortType: 'rating'},
  sortPosition: false,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<{categoryId: number, categoryName: string}>) => {
      state.categoryId = action.payload.categoryId
      state.categoryName = action.payload.categoryName
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setSelectSortItem: (state, action: PayloadAction<SortItem>) => {
      state.selectSortItem = action.payload
    },
    setSortPosition: (state, action: PayloadAction<boolean>) => {
      state.sortPosition = action.payload
    },
    setFilters: (state, action: PayloadAction<FilterType>) => {
      state.selectSortItem = action.payload.selectSortItem
    },
    setFilterDefault: (state) => initialState
  }
})

export const {
  setActiveCategory,
  setSelectSortItem,
  setSortPosition,
  setFilters,
  setSearchValue,
  setFilterDefault
} = filterSlice.actions

export default filterSlice.reducer