import {createSlice} from "@reduxjs/toolkit";


const initialState: boolean = false

const mountSlice = createSlice({
  name: 'mount',
  initialState,
  reducers: {
    setIsMount: (state, action) => action.payload
  }
})

export const {setIsMount} = mountSlice.actions
export default mountSlice.reducer