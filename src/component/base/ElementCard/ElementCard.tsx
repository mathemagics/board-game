import * as React from 'react';
import {useDrag} from 'react-dnd';

import {Card} from 'component/base/Card';

export const CARD_TYPE = 'card';

export const ElementCard = props => {
  const {suit, from} = props;

  const [{_isDragging}, drag] = useDrag({
    item: {type: CARD_TYPE, suit, from},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return <Card ref={drag} {...props} />;
};
