export type ICreateUser = {
  name: string;
  email: string;
  password: string;
  institution: string;
  course: string;
};

export type SignInInput = {
  email: string;
  password: string;
};
