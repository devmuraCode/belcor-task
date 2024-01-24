import { createSlice } from '@reduxjs/toolkit';

import { getQuizzes } from '../service/getQuizzes';
import { ProductsState } from '../type/quizzes';

const initialState: ProductsState = {
  data: [],
  loading: true,
  error: null,
};

const quizzesSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuizzes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default quizzesSlice.reducer;
