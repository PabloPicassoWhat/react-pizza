import { configureStore } from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import filterReducer from './slices/filterSlice'
import paginationReducer from './slices/paginationSlice'
import cartReducer from './slices/cartSlice'
import pizzaSlice from './slices/pizzaSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pagination: paginationReducer,
    cart: cartReducer,
    pizza: pizzaSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()