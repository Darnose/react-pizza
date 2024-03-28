import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sortType.sortBy = action.payload.sortBy;
      state.sortType.order = action.payload.order;
      state.sortType.name = action.payload.name;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
