import {CartItem} from "../redux/cart/types";

export const calcTotalPrice = (items: CartItem[]) =>
  items?.reduce((sum, obj) => Number(obj.price) * Number(obj.count) + sum, 0)