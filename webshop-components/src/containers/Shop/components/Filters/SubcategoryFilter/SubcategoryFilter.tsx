import * as React from 'react';
import classNames from 'classnames';

import { ICategory, ISubCategory } from '../../../interfaces';

import styles from './SubcategoryFilter.module.css';

export interface ISubcategoryFilterProps {
  category: ICategory;
  subcategory: ISubCategory;
  onAddSubcategories: (ids: number[]) => void;
  onRemoveSubcategories: (ids: number[]) => void;
}

export interface ISubcategoryFilterState {
  isSet: boolean;
}

export class SubcategoryFilter extends React.PureComponent<ISubcategoryFilterProps, ISubcategoryFilterState> {

  public state = {
    isSet: true,
  }

  public render() {
    const { isSet } = this.state;
    const { subcategory, onAddSubcategories, onRemoveSubcategories } = this.props;
    return (
      <div>
        <input type='checkbox' checked={isSet} onClick={this.handleOnClick} />
        <div>{subcategory.name}</div>
      </div>
    );
  }

  private handleOnClick = () => {
    if (this.state.isSet) {
      this.props.onRemoveSubcategories([this.props.subcategory.id]);
    } else {
      this.props.onAddSubcategories([this.props.subcategory.id]);
    }
    this.setState({isSet: !this.state.isSet});
  }
}
