import {CartItem} from "../redux/slices/cartSlice";
import {ERROR_LS} from "../constant";

export const getItemsLS = () => localStorage.getItem('cart')

export const getCartFromLS = (data: any): CartItem[] => {
  try {
    return data ? JSON.parse(data) : []
  } catch (e: any) {
    console.log(e.message)
    return ERROR_LS
  }
}