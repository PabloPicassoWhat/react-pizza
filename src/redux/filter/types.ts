export type SortItem = {
  name: string
  sortType: 'rating' | 'price' | 'title'
}

export interface FilterSliceState {
  categoryId: number
  searchValue: string
  selectSortItem?: SortItem
  sortPosition: boolean
  popupSort: boolean
}