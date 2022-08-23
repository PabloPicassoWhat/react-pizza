import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {getCartFromLS, getItemsLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {CartItem, CartSliceState} from "./types";

const initialState: CartSliceState = {
  items: getCartFromLS(getItemsLS()),
  totalPrice: calcTotalPrice(getCartFromLS(getItemsLS())),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items?.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count && findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) {
        findItem.count && findItem.count--
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItems: (state) => {
      state.items = []
      state.totalPrice = 0
    }
  }
})

export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions
export default cartSlice.reducer