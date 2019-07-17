import { IAuthToken } from '../containers/Auth/interfaces';

export const TOKEN_KEY = 'token';
export const CATEGORY_KEY = 'category';

export const saveAuthToken = (token: IAuthToken) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export const readAuthToken = (): IAuthToken => {
  try {
    const obj = JSON.parse(localStorage.getItem(TOKEN_KEY)) as IAuthToken;
    return obj;
  } catch {
    return null;
  }
}

export const deleteAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
}
