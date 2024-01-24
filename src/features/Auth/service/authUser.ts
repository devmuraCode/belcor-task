import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const authUser = createAsyncThunk('authUser', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/auth/login/');
    if (response.status !== 200) {
      throw new Error('Failed to authenticate');
    }
    const token = response.data.token;
    localStorage.setItem('token', token);
    response.data;
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error.message);
  }
});
