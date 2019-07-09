import * as React from 'react';
import classNames from 'classnames';

import { ICategory } from '../../interfaces';

import styles from './Filter.module.css';

export interface IFilterProps {
  category: ICategory;
  onAddSubcategories: (ids: number[]) => void;
  onRemoveSubcategories: (ids: number[]) => void;
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
    const { category, onAddSubcategories, onRemoveSubcategories } = this.props;
    return (
      <div className={styles.FilterContainer}>
        <button
          onClick={() => this.addOrRemoveSubcats()}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
            {category.name}
        </button>
        {category.subcategories.map((subCat) => (
          <div key={subCat.id}>{subCat.name}</div>
        ))}
      </div>
    );
  }

  private addOrRemoveSubcats = () => {
    if (this.state.isSet) {
      this.props.onRemoveSubcategories(this.getAllSubCatIds())
    } else {
      this.props.onAddSubcategories(this.getAllSubCatIds())
    }
    this.setState({isSet: !this.state.isSet});
  }

  private getAllSubCatIds = () => {
    const initial: number[] = [];
    return this.props.category.subcategories.reduce((prev, curr) => {
      return prev.concat(curr.id);
    }, initial);
  }

  private handleMouseEnter = () => {
    this.setState({ hoverOnFilter: true });
  }

  private handleMouseLeave = () => {
    this.setState({ hoverOnFilter: false });
  }
}