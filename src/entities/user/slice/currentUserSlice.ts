import { IUser } from '@/entities/user/type/userType';
import { createSlice } from '@reduxjs/toolkit';

import { currentUserService } from '../service/currentUserService';

interface IInitialState {
  loading: boolean;
  currentUser: IUser | null;
  error: any | null;
  success: boolean;
}

const initialState: IInitialState = {
  loading: false,
  currentUser: null,
  error: null,
  success: false,
};
const currentUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(currentUserService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUserService.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(currentUserService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default currentUserSlice.reducer;
