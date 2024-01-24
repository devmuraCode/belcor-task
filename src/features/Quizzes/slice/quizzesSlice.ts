import { createSlice } from '@reduxjs/toolkit';

import { getQuizzes } from '../service/getQuizzes';
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
      .addCase(getQuizzes.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default quizzesSlice.reducer;
