import * as React from 'react';

import { Aux } from '../Aux/Aux';
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar';
import { Footer } from '../../components/Footer/Footer';

import styles from './Layout.module.css';
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer';

interface ILayoutState {
  showSideDrawer: boolean;
}

export class Layout extends React.Component<{}, ILayoutState> {

  public state = {
    showSideDrawer: false,
  }

  public render() {
    return(
      <Aux>
        <SideDrawer
          onClick={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <Toolbar
          onDrawerTogglerClick={this.sideDrawerToggleHandler}
        />
        <main className={styles.Content}>
          {this.props.children}
        </main>
        <Footer />
      </Aux>
    );
  }

  private sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }
  private sideDrawerToggleHandler = () => {
    this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }));
  }

}