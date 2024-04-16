import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilterSlice } from '../../../components/Sort/interface/ISort';
import { IPizza } from '../../../components/PizzaBlock/interface/IPizza';

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
