import * as React from 'react';
import {useDrag} from 'react-dnd';

import {Card} from 'component/base/Card';
import {Card as CardType} from 'game/card';

export const CARD_TYPE = 'card';

interface ElementCardProps {
  suit: CardType;
  from: string;
  onDoubleClick: () => void;
}

export const ElementCard: React.FC<ElementCardProps> = props => {
  const {suit, from} = props;

  const [{_isDragging}, drag] = useDrag({
    item: {type: CARD_TYPE, suit, from},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return <Card ref={drag} {...props} />;
};
