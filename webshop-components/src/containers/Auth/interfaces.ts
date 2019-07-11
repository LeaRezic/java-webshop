export interface IAuthToken {
  email: string;
  expireTime: string;
  tokenId: string;
  isAdmin: boolean;
}

export interface IAuthState {
  token: IAuthToken;
  meta: {
    isRequestingLogin: boolean;
    isRequestingRegister: boolean;
    loginSuccess: boolean;
    registerSuccess: boolean;
    loginError: string;
    registerError: string;
    shouldRedirectToProducts: boolean;
  }
}
