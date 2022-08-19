import {CartItem} from "../redux/cart/types";
import {ERROR_LS} from "../constant";

const setItemsLS = (items: string) => localStorage.setItem('cart', items)

export const setCartFromLS = (items: CartItem[]) => {
  try {
    return items ? setItemsLS(JSON.stringify(items)) : setItemsLS(JSON.stringify(ERROR_LS))
  } catch (e: any) {
    console.log(e.message)
  }
}