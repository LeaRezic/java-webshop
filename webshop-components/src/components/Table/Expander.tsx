import * as React from 'react';

import imgDownArrowPath from './images/down-arrow.png';
import imgRightArrowPath from './images/right-arrow.png';

import './Expander.css';

export const Expander = ({
  isExpanded,
}) => (
  <div className={'Expander'}>
    { isExpanded
        ? <img src={imgRightArrowPath} />
        : <img src={imgDownArrowPath} /> }
  </div>
);
