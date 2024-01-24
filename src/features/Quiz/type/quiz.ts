export interface IQuizResponse {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  ans: number;
}

export interface ProductsState {
  quiz: IQuizResponse[];
  loading: boolean;
  error: string | null;
}
