import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ category, currentPage, sortType, searchValue }) => {
    const res = await axios.get(
      `https://65f55849f54db27bc022f046.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortBy}&order=${sortType.order}&search=${searchValue}`,
    );
    return res.data;
  },
);

const initialState = {
  data: [],
  status: '',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setData(state, action) {
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

export const { setData } = pizzaSlice.actions;

export default pizzaSlice.reducer;
