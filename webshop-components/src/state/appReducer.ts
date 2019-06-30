import { IAppState } from "./appState";

const initialState: IAppState = {
  isAuthenticated: false,
  isAdmin: false,
}

export const reducer = (state: IAppState = initialState, action: any) => {
  return state;
};
