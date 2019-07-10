import * as React from 'react';
import classNames from 'classnames';

import { ICategory } from '../../../interfaces';
import { SubcategoryFilter } from '../SubcategoryFilter/SubcategoryFilter';

import styles from './CategoryFilter.module.css';
import globalStyles from '../../../../../style/GlobalStyle.module.css';

export interface ICategoryFilterProps {
  category: ICategory;
  isSet: boolean;
  onChangeCategoryId: (id: number) => void;
  onAddSubcategories: (ids: number[]) => void;
  onRemoveSubcategories: (ids: number[]) => void;
}

export class CategoryFilter extends React.PureComponent<ICategoryFilterProps> {

  public state = {
    hoverOnFilter: false,
  }

  public render() {
    const { category, isSet, onAddSubcategories, onRemoveSubcategories } = this.props;
    return (
      <div className={styles.FilterContainer}>
        <button
          className={classNames(
            globalStyles.Btn,
            globalStyles.BtnSecondary,
            styles.BtnCategory,
            { [styles.Clicked]: this.props.isSet })}
          onClick={() => this.addOrRemoveSubcats()}
        >
            {category.name}
        </button>
        {/* <div className={styles.SubcatContainer}>
          {isSet
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
            : null}
        </div> */}
      </div>
    );
  }

  private addOrRemoveSubcats = () => {
    if (this.props.isSet) {
      this.props.onChangeCategoryId(0);
    } else {
      this.props.onChangeCategoryId(this.props.category.id);
    }
  }

  private getAllSubCatIds = () => {
    const initial: number[] = [];
    return this.props.category.subcategories.reduce((prev, curr) => {
      return prev.concat(curr.id);
    }, initial);
  }
}