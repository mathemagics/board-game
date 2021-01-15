import * as React from 'react';
import {useDrop} from 'react-dnd';

import {CardGroup} from 'component/base/CardGroup';
import {CARD_TYPE} from 'component/base/ElementCard';
import {Card} from 'game/card';

interface DiscardPileProps {
  card: Card;
  onDrop: (card: Card) => void;
  onCardDoubleClick: (card: Card) => void;
}

export const DiscardPile: React.FC<DiscardPileProps> = ({
  card,
  onDrop,
  onCardDoubleClick,
}) => {
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
