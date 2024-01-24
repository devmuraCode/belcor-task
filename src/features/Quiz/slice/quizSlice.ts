import { createSlice } from '@reduxjs/toolkit';
import { getQuiz } from '../service/getQuiz';
import { ProductsState } from '../type/quiz';

const initialState: ProductsState = {
  quiz: [],
  loading: true,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quiz = action.payload;
      })
      .addCase(getQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default quizSlice.reducer;
