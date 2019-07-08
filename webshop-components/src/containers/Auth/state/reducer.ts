import { IAuthState } from '../interfaces';

const initialState: IAuthState = {
  isAuthenticated: false,
  isAdmin: false,
}

export const authReducer = (state: IAuthState = initialState, action: any): IAuthState => {
  return state;
};
