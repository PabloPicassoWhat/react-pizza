import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterType} from "../../pages/Home";

export type SortItem = {
  name: string
  sortType: 'rating' | 'price' | 'title'
}

export interface FilterSliceState {
  categoryId: number
  searchValue: string
  selectSortItem: SortItem
  sortPosition: boolean
  popupSort: boolean
}

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
    setSelectSortItem: (state, action: PayloadAction<SortItem> ) => {
      state.selectSortItem = action.payload
    },
    setSortPosition: (state, action: PayloadAction<boolean> ) => {
      state.sortPosition = action.payload
    },
    setPopupSort: (state, action: PayloadAction<boolean>) => {
      state.popupSort = action.payload
    },
    setFilters: (state, action: PayloadAction<FilterType>) => {
      state.categoryId = Number(action.payload.categoryId)
      state.selectSortItem = action.payload.selectSortItem
    }
  }
})

export const { setActiveCategory, setSelectSortItem, setSortPosition, setPopupSort, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer