import { ILoginUserResponse } from '@/pages/Auth/type/userType';
import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../service/loginUserService';

interface IInitialState {
  loading: boolean;
  userInfo: ILoginUserResponse | null;
  error: any | null;
  success: boolean;
}

const initialState: IInitialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetLoginState } = authSlice.actions;
