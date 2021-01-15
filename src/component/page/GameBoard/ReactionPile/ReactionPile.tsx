import * as React from 'react';
import {useDrop} from 'react-dnd';

import {CardGroup} from 'component/base/CardGroup';
import {CARD_TYPE} from 'component/base/ElementCard';

import {Card} from 'game/card';

interface ReactionPileProps {
  reaction: Card[];
  onDrop: (card: Card) => void;
  onCardDoubleClick: (card: Card) => void;
}

export const ReactionPile: React.FC<ReactionPileProps> = ({
  reaction,
  onDrop,
  onCardDoubleClick,
}) => {
  const [_, drop] = useDrop({
    accept: CARD_TYPE,
    canDrop: ({from}) => {
      // TODO tokenize
      const allowedFrom = ['hand'];
      return allowedFrom.includes(from);
    },
    drop: item => onDrop(item.suit),
  });

  return (
    <CardGroup
      name="reaction"
      ref={drop}
      label="Reaction:"
      cards={reaction}
      onCardDoubleClick={onCardDoubleClick}
    />
  );
};
