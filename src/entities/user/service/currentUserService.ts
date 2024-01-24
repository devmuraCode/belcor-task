import axios from 'axios';
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from 'node_modules/@reduxjs/toolkit/dist/createAsyncThunk';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const currentUserService = createAsyncThunk(
  'authUser',
  async (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      if (!localStorage.getItem('token')) {
        throw new Error('Failed to authenticate');
      }

      const response = await axios.get('https://dummyjson.com/auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = response.data;

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
