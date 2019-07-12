import * as _ from 'lodash-es';
import * as React from 'react';

interface IAggregateFooterProps<T> {
  Cell: ComponentConstructor<any>;
  field: string;
  data: T[];
  format?: (value: T) => string;
  aggregate: (data: T[], rows?: any) => T; // TODO fix the type, @luka.skukan @domagoj.cerjan This type def is a bunch of lies
}

export class AggregateFooter<T> extends React.PureComponent<IAggregateFooterProps<T>> {
  public static defaultProps = {
    format: (value: any) => `${value}`,
  };

  public render() {
    const { Cell, aggregate, data, field } = this.props;

    const cellProps = _.omit(this.props, ['Cell', 'formatter']);

    return (
      <div>
        <Cell { ...cellProps } value={aggregate(data.map((row) => row[field]), data.map((row) => (row as any)._original))} />
      </div>
    );
  }
}
