import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {Pizza, PizzaParams, PizzaSliceState, Status} from "./types";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
}

export const fetchPizzas = createAsyncThunk<Pizza[], PizzaParams>('pizza/fetchPizzasStatus', async (params) => {
  const {category, sortBy, order, search, currentPage} = params
  const {data} = await axios.get<Pizza[]>(
    `https://62e8ff67249bb1284eb82257.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
  )
  return data
})

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer