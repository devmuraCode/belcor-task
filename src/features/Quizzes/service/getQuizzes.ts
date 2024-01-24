import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getQuizzes = createAsyncThunk('quizzes/getQuizzes', async () => {
  try {
    const response = await axios.get('http://localhost:3001/quizzes');
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
