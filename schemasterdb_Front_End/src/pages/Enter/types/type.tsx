export type UserCreate = {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
};
