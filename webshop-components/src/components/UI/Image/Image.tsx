import * as React from 'react';
import classNames from 'classnames';

import styles from './Image.module.css';

export interface IIMageProps {
  src: string;
  shouldCover: boolean;
}

export class Image extends React.PureComponent<IIMageProps> {

  public state = { hoverOnProduct: false }

  public render() {
    const {
      src,
      shouldCover,
    } = this.props;
    return (
      <div>
        { shouldCover
            ? (
                <div className={classNames(styles.Image, styles.Cover)} style={{backgroundImage:''}}>
                  <button className={styles.BtnReadMore}>Read More</button>
                  <button className={styles.BtnAdd}>Add to Cart</button>
                </div >
              )
            : <img className={styles.Image} src={src} />
      }
      </div>
    );
  }
}
