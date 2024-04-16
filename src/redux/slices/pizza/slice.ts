import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IPizza, IPizzaSlice, Status } from '../../../components/PizzaBlock/interface/IPizza';
import { fetchPizzas } from './asyncActions';

const initialState: IPizzaSlice = {
  data: [],
  status: Status.LOADING,
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
        state.status = Status.LOADING;
        state.data = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = [];
      });
  },
});

export const { setData } = pizzaSlice.actions;

export default pizzaSlice.reducer;
