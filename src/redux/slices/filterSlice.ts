import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import ISort, { IFilterSlice } from '../../components/Sort/interface/ISort';
import { RootState } from '../store';

const initialState: IFilterSlice = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'популярности(по возрастанию)',
    sortBy: 'rating',
    order: 'asc',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<ISort>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sortType.sortBy = action.payload.sortBy;
      state.sortType.order = action.payload.order;
      state.sortType.name = action.payload.name;
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const selectFilter = (state: RootState) => state.filterSlice;
export const selectSort = (state: RootState) => state.filterSlice.sortType;
export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
