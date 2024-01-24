export interface IUser {
  id: number;
  username: string;
  password: string;
}
export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}
