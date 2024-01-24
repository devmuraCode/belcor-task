import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from '../service/getQuizzes';
import { ProductsState } from '../type/quizzes';

const initialState: ProductsState = {
  data: [],
  loading: 'idle',
  error: null,
};

const quizzesSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default quizzesSlice.reducer;
