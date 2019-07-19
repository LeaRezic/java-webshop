import * as React from 'react';

import styles from './ErrorBoundary.module.css';
import { Aux } from '../../hoc/Aux/Aux';
import { NoData } from '../UI/NoData/NoData';

interface IErrorBoundaryProps {
  children: JSX.Element;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
  public state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return(
        <Aux>
          <h1 className={styles.MainError}>Ooops, something went wrong. :( Please try again later or contact support.</h1>
          <NoData />
        </Aux>
      );
    }
    return this.props.children;
  }
}
