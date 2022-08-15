import {createSlice} from "@reduxjs/toolkit";

type PaginationSliceState = {
  currentPage: number
}

const initialState: PaginationSliceState = {
  currentPage: 1
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPage: (state, action) => {
      state.currentPage = Number(action.payload.currentPage)
    }
  }
})

export const {setCurrentPage, setPage} = paginationSlice.actions
export default paginationSlice.reducer