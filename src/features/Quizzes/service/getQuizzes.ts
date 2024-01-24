import { httpClient } from '@/core/httpClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await httpClient.get('/quizzes');
    return response.data;
  },
);
