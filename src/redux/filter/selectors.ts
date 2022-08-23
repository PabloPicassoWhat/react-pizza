import {RootState} from "../store";

export const selectFilter = (state: RootState) => state.filter
export const selectCategoryName = (state: RootState) => state.filter.categoryName