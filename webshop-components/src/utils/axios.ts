import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_REMOTE_BASE_URL
  : process.env.REACT_APP_LOCALHOST_BASE_URL;

export const instance = axios.create({baseURL: BASE_URL});
