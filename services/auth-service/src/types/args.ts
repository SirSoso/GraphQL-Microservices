export interface SignUpArgs {
  input: SignUpInput;
}

export interface SignInArgs {
  email: string;
  password: string;
}

interface SignUpInput {
  name: string;
  email: string;
  password: string;
  last_name: string;
}
