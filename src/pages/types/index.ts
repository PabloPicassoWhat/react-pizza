import {SortItem} from "../../redux/filter/types";
import {Pizza} from "../../redux/pizza/types";

export type FilterType = {
  categoryId?: string
  currentPage?: string
  sortType?: string
  selectSortItem?: SortItem
}

export interface IContent {
  items: Pizza[]
  currentPage?: number
  status: string
}