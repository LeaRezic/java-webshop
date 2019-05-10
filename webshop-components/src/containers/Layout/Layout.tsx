import * as React from 'react';

interface ILayout {
  data: any;
}

export class Layout extends React.PureComponent<ILayout> {
  public render() {
    return (
      <div>
        <div>Navigation Toolbar</div>
        <main>{this.props.children}</main>
      </div>
    );
  }
}