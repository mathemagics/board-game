import * as React from 'react';
import {useDrop} from 'react-dnd';

import {CARD_TYPE} from 'component/base/ElementCard';
import {Card} from 'component/base/Card';
import {Card as CardType} from 'game/card';

interface PoolCardProps {
  suit: CardType;
  onDrop: () => {};
  onDoubleClick: (suit: CardType) => {};
}

export const PoolCard: React.FC<PoolCardProps> = ({
  suit,
  onDrop,
  onDoubleClick,
}) => {
  const [_, drop] = useDrop({
    accept: CARD_TYPE,
    canDrop: ({from}) => {
      // TODO tokenize
      const allowedFrom = ['hand'];
      return allowedFrom.includes(from);
    },
    drop: item => onDrop(item, suit),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <Card ref={drop} suit={suit} onDoubleClick={() => onDoubleClick(suit)} />
  );
};
