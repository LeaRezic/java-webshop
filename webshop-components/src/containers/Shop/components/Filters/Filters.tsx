import * as React from 'react';

import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { ICategory } from '../../interfaces';
import { CategoryFilter } from './CategoryFilter/CategoryFilter';

import styles from './Filters.module.css';
import { SubcategoryFilter } from './SubcategoryFilter/SubcategoryFilter';

interface IFilters {
  filterList: ICategory[];
  chosenCategoryId: number;
  chosenSubcategoryIds: number[];
  onChangeCategoryId: (id: number) => void;
  onAddSubcategories: (ids: number[]) => void;
  onRemoveSubcategories: (ids: number[]) => void;
}

export class Filters extends React.Component<IFilters> {
  public render() {
    const { filterList } = this.props;
    const chosenCat = this.props.filterList.find((cat) => cat.id === this.props.chosenCategoryId);
    const categoryFilters = filterList.length
      ? filterList.map((category) => (
        <CategoryFilter
          category={category}
          key={category.id}
          isSet={category.id === this.props.chosenCategoryId}
          onAddSubcategories={this.props.onAddSubcategories}
          onRemoveSubcategories={this.props.onRemoveSubcategories}
          onChangeCategoryId={this.props.onChangeCategoryId}
        />
        ))
      : <Spinner />;
    return (
      <div className={styles.Filters}>
        <div>
          {categoryFilters}
        </div>
        <br/>
        { this.props.chosenCategoryId
          ? chosenCat!.subcategories.map((subcat) => (
            <SubcategoryFilter
              key={subcat.id}
              isSet={this.props.chosenSubcategoryIds.includes(subcat.id)}
              subcategory={subcat}
              category={chosenCat!}
              onAddSubcategories={this.props.onAddSubcategories}
              onRemoveSubcategories={this.props.onRemoveSubcategories} />))
          : null }
      </div>
    );
  }
}