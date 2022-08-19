import {SortItem} from "../../redux/filter/types";

export type SortProps = {
  selectItem?: SortItem
  sortPosition: boolean
  popupSort: boolean
}

export type CategoriesProps = {
  valueCategory: number
}