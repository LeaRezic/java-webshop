import * as React from 'react';

import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { ICategory } from '../../interfaces';
import { Filter } from '../Filter/Filter';

import styles from './Filters.module.css';

interface IFilters {
  filterList: ICategory[];
  onAddSubcategories: (ids: number[]) => void;
  onRemoveSubcategories: (ids: number[]) => void;
}

export class Filters extends React.Component<IFilters> {
  public render() {
    const { filterList } = this.props;
    const displayFilters = filterList.length
      ? filterList.map((category) => (
        <Filter
          category={category}
          key={category.id}
          onAddSubcategories={this.props.onAddSubcategories}
          onRemoveSubcategories={this.props.onRemoveSubcategories}
        />
        ))
      : <Spinner />;
    return (
      <div className={styles.Filters}>
        {displayFilters}
      </div>
    );
  }
}