import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IPizza, IPizzaSlice } from '../../components/PizzaBlock/interface/IPizza';
import { RootState } from '../store';
import { IFilterSlice } from '../../components/Sort/interface/ISort';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ categoryId, currentPage, sortType, searchValue }: IFilterSlice) => {
    const { data } = await axios.get<IPizza[]>(
      `https://65f55849f54db27bc022f046.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}&` : ''
      }&sortBy=${sortType.sortBy}&order=${sortType.order}&search=${searchValue}`,
    );
    return data;
  },
);

const initialState: IPizzaSlice = {
  data: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<IPizza[]>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.data = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.data = [];
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizzaSlice;
export const { setData } = pizzaSlice.actions;

export default pizzaSlice.reducer;
