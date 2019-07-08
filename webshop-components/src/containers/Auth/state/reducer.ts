import { IAuthState } from '../interfaces';

const initialState: IAuthState = {
  isAuthenticated: false,
  isAdmin: false,
}

export const reducer = (state: IAuthState = initialState, action: any) => {
  return state;
};
