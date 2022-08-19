import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {FilterSliceState, SortItem} from "./types";
import {FilterType} from "../../pages/types";

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: '',
  selectSortItem: {name: 'популярности', sortType: 'rating'},
  sortPosition: false,
  popupSort: false
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
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
    setPopupSort: (state, action: PayloadAction<boolean>) => {
      state.popupSort = action.payload
    },
    setFilters: (state, action: PayloadAction<FilterType>) => {
      // state.categoryId = Number(action.payload.categoryId)
      state.selectSortItem = action.payload.selectSortItem
    },
    setFilterDefault: (state) => initialState
  }
})

export const {
  setActiveCategory,
  setSelectSortItem,
  setSortPosition,
  setPopupSort,
  setFilters,
  setSearchValue,
  setFilterDefault
} = filterSlice.actions

export default filterSlice.reducer