import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '@/app/providers/storeProvider/store';
import { RoutePath } from '@/shared/config/routeConfig/routes';
import { Button } from '@/widgets/Button';

import classes from './QuizzesPage.module.scss';
import { getQuizzes } from '../service/getQuizzes';

export const QuizzesPage = () => {
  const dispatch = useAppDispatch();
  const quizzes = useAppSelector((state) => state.quizzes.data);
  const loading = useAppSelector((state) => state.quizzes.loading);
  const error = useAppSelector((state) => state.quizzes.error);

  useEffect(() => {
    dispatch(getQuizzes());
  }, [dispatch]);

  if (loading === 'pending') {
    return <div>Loading...</div>;
  }

  if (loading === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>

      <div className={classes.quizzes}>
        {quizzes.map((quiz) => (
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {quiz.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <Button>
              <Link to={`${RoutePath.quizzes}/${quiz.name}`}>Start</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
