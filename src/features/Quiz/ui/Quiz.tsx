import { FC, MouseEvent, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '@/app/providers/storeProvider/store';
import { IQuizResponse } from '@/features/Quiz/type/quiz';

import { getQuiz } from '../service/getQuiz';
import classes from './Quiz.module.scss';

type TProps = {};
export const Quiz: FC<TProps> = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ quizName: string }>();
  const { quiz, loading } = useAppSelector((state) => state.quiz);
  console.log('quiz', quiz);

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState<IQuizResponse | null>(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    if (params.quizName) {
      dispatch(getQuiz(params.quizName));
    }
  }, [dispatch]);

  useEffect(() => {
    if (quiz) {
      setQuestion(quiz[0]);
    }
  }, [quiz]);

  if (!question) {
    return <h1>Loading ...</h1>;
  }

  const checkAnswer = (
    e: MouseEvent<HTMLLIElement, MouseEvent>,
    ans: number,
  ) => {
    if (lock === false) {
      if (question.ans === ans) {
        (e.target as HTMLElement).classList.add(classes['correct']);
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        (e.target as HTMLElement).classList.add(classes['wrong']);
        setLock(true);
        (
          option_array[question.ans - 1].current as unknown as HTMLElement
        ).classList.add(classes['correct']);
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === quiz.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex((index) => index + 1);
      setQuestion(quiz[index + 1]);
      setLock(false);
      option_array.map((option) => {
        (option.current as unknown as HTMLElement)?.classList.remove(
          classes['wrong'],
        );
        (option.current as unknown as HTMLElement)?.classList.remove(
          classes['correct'],
        );
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(quiz[0]);
    setLock(false);
    setScore(0);
    setResult(false);
  };

  return (
    <div className={classes.container}>
      {loading && <h1>Loading...</h1>}
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e: any) => {
                checkAnswer(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e: any) => {
                checkAnswer(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e: any) => {
                checkAnswer(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e: any) => {
                checkAnswer(e, 3);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {quiz.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            Your Score {score} out of {quiz.length}
          </h2>
          <button onClick={reset}>Result</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
