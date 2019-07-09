import * as React from 'react';
import classNames from 'classnames';

import { IProduct, ICategory } from '../../interfaces';

import styles from './Filter.module.css';

export interface IFilterProps {
  category: ICategory;
  onAddCategory: (categoryId: number) => void;
  onRemoveCategory: (categoryId: number) => void;
  onDecrementProduct: (categoryId: number) => void;
}

export interface IFilterState {
  hoverOnFilter: boolean;
  isSet: boolean;
}

export class Filter extends React.PureComponent<IFilterProps, IFilterState> {

  public state = {
    hoverOnFilter: false,
    isSet: false,
  }

  public render() {
    const { hoverOnFilter } = this.state;
    return (
      <div>
      </div>
    );
  }

  private handleMouseEnter = () => {
    this.setState({ hoverOnFilter: true });
  }

  private handleMouseLeave = () => {
    this.setState({ hoverOnFilter: false });
  }
}