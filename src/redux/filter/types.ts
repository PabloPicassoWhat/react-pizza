export type SortItem = {
  name: string
  sortType: 'rating' | 'price' | 'title'
}

export interface FilterSliceState {
  categoryId: string
  categoryName: string
  searchValue: string
  selectSortItem?: SortItem
  sortPosition: boolean
}