export type SortItem = {
  name: string
  sortType: 'rating' | 'price' | 'title'
}

export interface FilterSliceState {
  categoryId: number
  categoryName: string
  searchValue: string
  selectSortItem?: SortItem
  sortPosition: boolean
}