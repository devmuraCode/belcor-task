import React from 'react';

import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Quiz } from '@/features/Quiz';
import { QuizzesPage } from '@/features/Quizzes';
import { AboutPage } from '@/pages/AboutPage';
import { AuthenticationPage } from '@/pages/Auth';
import MainLayout from '@/pages/MainLayout';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export enum AppRoutes {
  LOGIN = 'login',
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
  QUIZZES = 'quizzes',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.NOT_FOUND]: '*',
  [AppRoutes.QUIZZES]: '/quizzes',
};


export const router = createBrowserRouter([
  {
    path: RoutePath.login,
    element: <AuthenticationPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: RoutePath.main,
        element:<MainPage />,
      },
      {
        path: RoutePath.about,
        element: <AboutPage /> ,
      },
      {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
      },
      {
        path: RoutePath.quizzes,
        element: <QuizzesPage />,
      },
      {
        path: `${RoutePath.quizzes}/:quizName`,
        element: <Quiz />,
      },
    ],
  },
]);
