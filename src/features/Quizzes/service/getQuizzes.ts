import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuizzes = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('/quizzes');
    return response.data;
  },
);
