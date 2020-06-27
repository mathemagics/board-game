import * as React from 'react';
import {useDrop} from 'react-dnd';

import {CardGroup} from 'component/base/CardGroup';
import {CARD_TYPE} from 'component/base/ElementCard';

export const BanPile = ({card, onDrop}) => {
  const [{isOver, canDrop}, drop] = useDrop({
    accept: CARD_TYPE,
    canDrop: ({from}) => {
      // TODO tokenize
      const allowedFrom = ['hand', 'pool'];
      return allowedFrom.includes(from);
    },
    drop: item => onDrop(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return <CardGroup name="banned" ref={drop} label="Banned:" cards={[card]} />;
};
