export interface SignupDto {
  username: string;
  password: string;
  email?: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
