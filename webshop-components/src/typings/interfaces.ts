import { RouteComponentProps, StaticContext } from 'react-router';

export interface IReduxAction<T = any, E = any, M = any, S = string> {
  type: S;
  data?: T;
  error?: E | E[];
  meta?: M;
  callbacks?: {
    [callback: string]: (...args: any[]) => void;
  };
}

export type ReactRouterProps = Readonly<RouteComponentProps<any, StaticContext, any>>;
