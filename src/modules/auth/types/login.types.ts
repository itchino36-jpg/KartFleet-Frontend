export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}


//opcional
export interface LoginFormErrors {
  email?: string;
  password?: string;
}



export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
