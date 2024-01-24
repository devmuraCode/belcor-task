export interface ILoginUserResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface ILoginUserRequest {
  username: string;
  password: string;
}
