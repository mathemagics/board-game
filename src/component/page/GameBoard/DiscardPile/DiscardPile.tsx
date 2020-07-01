import * as React from 'react';
import {useDrop} from 'react-dnd';

import {CardGroup} from 'component/base/CardGroup';
import {CARD_TYPE} from 'component/base/ElementCard';

export const DiscardPile = ({card, onDrop, onCardDoubleClick}) => {
  const [{isOver, canDrop}, drop] = useDrop({
    accept: CARD_TYPE,
    canDrop: ({from}) => {
      // TODO tokenize
      const allowedFrom = ['hand'];
      return allowedFrom.includes(from);
    },
    drop: item => onDrop(item.suit),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <CardGroup
      name="discard"
      ref={drop}
      label="Discard:"
      cards={[card]}
      onCardDoubleClick={onCardDoubleClick}
    />
  );
};
