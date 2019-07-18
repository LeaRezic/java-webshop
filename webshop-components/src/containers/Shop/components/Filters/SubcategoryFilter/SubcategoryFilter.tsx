import * as React from 'react';

import {
  ICategory,
  ISubCategory,
} from '../../../interfaces';

import styles from './SubcategoryFilter.module.css';

export interface ISubcategoryFilterProps {
  isSet: boolean;
  category: ICategory;
  subcategory: ISubCategory;
  onAddSubcategories: (ids: number[]) => void;
  onRemoveSubcategories: (ids: number[]) => void;
}
export class SubcategoryFilter extends React.PureComponent<ISubcategoryFilterProps> {

  public render() {
    const {
      subcategory,
      isSet,
    } = this.props;
    return (
      <div className={styles.SubcategoryFilterContainer}>
        <label className={styles.container}>{subcategory.name}
          <input type='checkbox' checked={isSet} onChange={this.handleOnClick} />
            <span className={styles.checkmark}></span>
        </label>
      </div>
    );
  }

  private handleOnClick = () => {
    if (this.props.isSet) {
      this.props.onRemoveSubcategories([this.props.subcategory.id]);
    } else {
      this.props.onAddSubcategories([this.props.subcategory.id]);
    }
  }
}
