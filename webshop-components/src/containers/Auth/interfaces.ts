export interface IAuthState {
  isAuthenticated: boolean;
  userName: string;
  isAdmin: boolean;
  meta: {
    isRequestingLogin: boolean;
    isRequestingRegister: boolean;
    loginSuccess: boolean;
    registerSuccess: boolean;
    loginError: string;
    registerError: string;
  }
}
