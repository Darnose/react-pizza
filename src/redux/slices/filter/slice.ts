import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ISort, IFilterSlice, SortByEnum } from '../../../components/Sort/interface/ISort';

const initialState: IFilterSlice = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'популярности(по возрастанию)',
    sortBy: SortByEnum.RATING,
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
    setFilters(state, action: PayloadAction<IFilterSlice>) {
      state.sortType = action.payload.sortType;
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
