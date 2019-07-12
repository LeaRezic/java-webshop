import * as React from 'react';

import { Aux } from '../../hoc/Aux/Aux';

export enum INPUT_TYPE {
  TEXT = 'TEXT',
  PASSWORD = 'PASSWORD',
  EMAIL = 'EMAIL',
}

export interface IInputField {
  value: string;
  inputType: INPUT_TYPE;
  placeholder: string;
  label: string;
  isValid: boolean;
  isTouched: boolean;
  errorMsg?: string;
  onChange: () => void;
}

export class InputField extends React.PureComponent<IInputField> {
  public render() {
    const { inputType, placeholder, isValid, isTouched, errorMsg, onChange } = this.props;
    switch (inputType) {
      case INPUT_TYPE.EMAIL:
        return (
          <Aux>
            <input type='email' placeholder={placeholder} onChange={onChange} />
            { errorMsg && errorMsg.length > 0
                ? <p>{errorMsg}</p>
                : null }
          </Aux>
        );
      case INPUT_TYPE.PASSWORD:
        return (
          <Aux>
            <input type='password' placeholder={placeholder} onChange={onChange} />
            {errorMsg && errorMsg.length > 0
              ? <p>{errorMsg}</p>
              : null}
          </Aux>
        );
      default:
        return (
          <Aux>
            <input type='text' placeholder={placeholder} onChange={onChange} />
            {errorMsg && errorMsg.length > 0
              ? <p>{errorMsg}</p>
              : null}
          </Aux>
        );
    }
  }
}