export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginFormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export interface LoginUser {
  userId: string;
  username: string;
}

export interface LoginResponse {
  access_token: string;
  user: LoginUser;
  mustChangePassword: boolean;
}
