import * as React from 'react';
import classNames from 'classnames';

import { ICategory } from '../../../interfaces';

import styles from './CategoryFilter.module.css';
import { SubcategoryFilter } from '../SubcategoryFilter/SubcategoryFilter';

export interface ICategoryFilterProps {
  category: ICategory;
  onAddSubcategories: (ids: number[]) => void;
  onRemoveSubcategories: (ids: number[]) => void;
}

export interface ICategoryFilterState {
  isSet: boolean;
}

export class CategoryFilter extends React.PureComponent<ICategoryFilterProps, ICategoryFilterState> {

  public state = {
    hoverOnFilter: false,
    isSet: false,
  }

  public render() {
    const { isSet } = this.state;
    const { category, onAddSubcategories, onRemoveSubcategories } = this.props;
    return (
      <div className={styles.FilterContainer}>
        <button
          onClick={() => this.addOrRemoveSubcats()}
        >
            {category.name}
        </button>
        { isSet
            ? (
            category.subcategories.map((subCat) => (
              <SubcategoryFilter
                key={subCat.id}
                category={category}
                subcategory={subCat}
                onAddSubcategories={onAddSubcategories}
                onRemoveSubcategories={onRemoveSubcategories}
              />
            ))
            )
            : null }
      </div>
    );
  }

  private handleOnChange = (event: any) => {
    console.log(event);
  }

  private handleSubcatClick = (id: number) => {
    console.log(`[OPTION CLICK] - ${id}`);
    if (id === -1) {
      this.props.onAddSubcategories(this.getAllSubCatIds());
    } else {
      this.props.onRemoveSubcategories(this.getAllSubCatIds());
      this.props.onAddSubcategories([id]);
    }
  }

  private addOrRemoveSubcats = () => {
    if (this.state.isSet) {
      this.props.onRemoveSubcategories(this.getAllSubCatIds());
    } else {
      this.props.onAddSubcategories(this.getAllSubCatIds());
    }
    this.setState({isSet: !this.state.isSet});
  }

  private getAllSubCatIds = () => {
    const initial: number[] = [];
    return this.props.category.subcategories.reduce((prev, curr) => {
      return prev.concat(curr.id);
    }, initial);
  }
}