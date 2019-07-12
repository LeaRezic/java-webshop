// added this from instafin-components/typings/custom/global.d.ts
declare type ComponentConstructor<P> = React.ComponentClass<P> | React.StatelessComponent<P>;
declare type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
type KeyOf<T> = keyof T;

interface DeepKeyOfArray<T> extends Array<string> {
  ['0']?: KeyOf<T>;
  ['1']?: this extends {
    ['0']?: infer K0
  } ? K0 extends KeyOf<T> ? KeyOf<T[K0]> : never : never;
  ['2']?: this extends {
    ['0']?: infer K0;
    ['1']?: infer K1;
  } ? K0 extends KeyOf<T> ? K1 extends KeyOf<T[K0]> ? KeyOf<T[K0][K1]> : never : never : never;
  ['3']?: this extends {
    ['0']?: infer K0;
    ['1']?: infer K1;
    ['2']?: infer K2;
  } ? K0 extends KeyOf<T> ? K1 extends KeyOf<T[K0]> ? K2 extends KeyOf<T[K0][K1]> ? KeyOf<T[K0][K1][K2]> : never : never : never : never;
  ['4']?: this extends {
    ['0']?: infer K0;
    ['1']?: infer K1;
    ['2']?: infer K2;
    ['3']?: infer K3;
  } ? K0 extends KeyOf<T> ? K1 extends KeyOf<T[K0]> ? K2 extends KeyOf<T[K0][K1]> ? K3 extends KeyOf<T[K0][K1][K2]> ? KeyOf<T[K0][K1][K2][K3]> : never : never : never : never : never;
  ['5']?: this extends {
    ['0']?: infer K0;
    ['1']?: infer K1;
    ['2']?: infer K2;
    ['3']?: infer K3;
    ['4']?: infer K4;
  } ? K0 extends KeyOf<T> ? K1 extends KeyOf<T[K0]> ? K2 extends KeyOf<T[K0][K1]> ? K3 extends KeyOf<T[K0][K1][K2]> ? K4 extends KeyOf<T[K0][K1][K2][K3]> ? KeyOf<T[K0][K1][K2][K3][K4]> : never : never : never : never : never : never;
  ['6']?: this extends {
    ['0']?: infer K0;
    ['1']?: infer K1;
    ['2']?: infer K2;
    ['3']?: infer K3;
    ['4']?: infer K4;
    ['5']?: infer K5;
  } ? K0 extends KeyOf<T> ? K1 extends KeyOf<T[K0]> ? K2 extends KeyOf<T[K0][K1]> ? K3 extends KeyOf<T[K0][K1][K2]> ? K4 extends KeyOf<T[K0][K1][K2][K3]> ? K5 extends KeyOf<T[K0][K1][K2][K3][K4]> ? KeyOf<T[K0][K1][K2][K3][K4][K5]> : never : never : never : never : never : never : never;
}

declare type DeepKeyOf<T> = DeepKeyOfArray<T> | KeyOf<T>;

// added this for the helpers in dsl lib for fast filter
declare interface ObjectConstructor {
  values(obj: any): any[];
}
