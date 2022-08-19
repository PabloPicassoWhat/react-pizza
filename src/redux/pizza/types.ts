export type Pizza = {
  id: number
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}

export type PizzaParams = {
  category: string
  sortBy?: string
  order: string
  search: string
  currentPage: number
}