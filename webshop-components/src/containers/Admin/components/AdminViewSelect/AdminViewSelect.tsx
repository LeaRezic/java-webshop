import * as React from 'react';

import { AdminViewType } from '../../interfaces';

interface IAdminViewSelectProps {
  views: AdminViewType[];
  selectedView: AdminViewType;
  onSelect: (view: AdminViewType) => void;
}

interface ISingleViewButton {
  view: AdminViewType;
  isSelected: boolean;
  onSelect: (view: AdminViewType) => void;
}

class SingleViewButton extends React.PureComponent<ISingleViewButton> {
  public render() {
    const { view, isSelected } = this.props;
    return(
      <label>
        <input
          type='radio'
          name='adminView'
          checked={isSelected}
          onChange={this.handleChange}
        />
        {view.split('_')[1]}
      </label>
    );
  }

  private handleChange = () => {
    if (!this.props.isSelected) {
      this.props.onSelect(this.props.view);
    }
  }
}

export class AdminViewSelect extends React.PureComponent<IAdminViewSelectProps> {
  public render() {
    const { views, selectedView } = this.props;
    return(
      <div className='bla'>
        <h3>CHOOSE VIEW</h3>
        { views.map((view) => (
          <SingleViewButton
            view={view}
            isSelected={view === selectedView}
            onSelect={this.props.onSelect}
          />)) }
      </div>
    );
  }
}
