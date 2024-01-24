import axios from 'axios';
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from 'node_modules/@reduxjs/toolkit/dist/createAsyncThunk';

import { ILoginUserRequest } from '@/pages/Auth/type/userType';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'authUser',
  async (
    inputData: ILoginUserRequest,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>,
  ) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        inputData,
      );

      if (response.status !== 200) {
        throw new Error('Failed to authenticate');
      }
      const data = response.data;
      localStorage.setItem('token', data.token);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
