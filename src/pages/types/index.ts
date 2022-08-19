import {SortItem} from "../../redux/filter/types";
import {ReactNode} from "react";

export type FilterType = {
  categoryId?: string
  currentPage?: string
  sortType?: string
  selectSortItem?: SortItem
}

export interface IContent {
  items: any[]
  // skeleton: ReactNode
  // pizzaElement: ReactNode
  currentPage?: number
  status: string
}