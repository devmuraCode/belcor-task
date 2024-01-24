import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { currentUserReducer } from '@/entities/user';
import quizzesSlice from '@/features/Quizzes/slice/quizzesSlice';
import userAuthSlice from '@/pages/Auth/slice/userLoginSlice';
import { configureStore } from '@reduxjs/toolkit';
import quizSlice from '@/features/Quiz/slice/quizSlice';

export const store = configureStore({
  reducer: {
    auth: userAuthSlice,
    currentUser: currentUserReducer,
    quizzes: quizzesSlice,
    quiz: quizSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
