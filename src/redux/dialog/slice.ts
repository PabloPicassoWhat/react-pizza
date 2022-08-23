import {createSlice} from "@reduxjs/toolkit";


const initialState: boolean = false

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setOnDialog: (state, action) => action.payload
  }
})

export const {setOnDialog} = dialogSlice.actions
export default dialogSlice.reducer