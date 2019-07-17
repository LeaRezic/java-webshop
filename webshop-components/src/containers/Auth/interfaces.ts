export interface IAuthToken {
  email: string;
  expireTime: string;
  tokenId: string;
  isAdmin: boolean;
}

export interface IAuthState {
  token: IAuthToken;
  meta: {
    isRequestingAuth: boolean;
    authSuccess: boolean;
    authError: string;
    shouldRedirect: boolean;
    redirectDest: string;
  }
}

export interface IAuthDispatchData {
  credentials: {
    username: string;
    password: string;
  };
  visitorAddress: string;
}

export interface IAuthRequestData {
  credentials: {
    username: string;
    password: string;
  };
  isRegister: boolean;
  visitorAddress: string;
}
