import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  selectSortItem: {name: 'популярности', sortType: 'rating'},
  sortPosition: false,
  popupSort: false
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.categoryId = action.payload
    },
    setSelectSortItem: (state, action ) => {
      state.selectSortItem = action.payload
    },
    setSortPosition: (state, action ) => {
      state.sortPosition = action.payload
    },
    setPopupSort: (state, action) => {
      state.popupSort = action.payload
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId)
      state.selectSortItem = action.payload.sort
    }
  }
})

export const { setActiveCategory, setSelectSortItem, setSortPosition, setPopupSort, setFilters } = filterSlice.actions
export default filterSlice.reducer