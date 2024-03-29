import { createBrowserRouter } from 'react-router-dom';

import { Quiz } from '@/features/Quiz';
import { QuizzesPage } from '@/features/Quizzes';
import { LoginPage } from '@/pages/Auth';
import MainLayout from '@/pages/MainLayout';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export enum AppRoutes {
  LOGIN = 'login',
  MAIN = 'main',
  NOT_FOUND = 'not_found',
  QUIZZES = 'quizzes',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '*',
  [AppRoutes.QUIZZES]: '/quizzes',
};


export const router = createBrowserRouter([
  {
    path: RoutePath.login,
    element: <LoginPage />,
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
