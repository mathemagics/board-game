import * as React from 'react';

import {Container, Label} from './CardGroup.style';
import {Card} from '../Card';

export const CardGroup = ({cards, label, isSorted, onCardDoubleClick}) => {
  const orderedCards = isSorted ? cards.slice().sort() : cards;

  return (
    <Container>
      <Label>{label}</Label>
      {orderedCards.map((card, index) => (
        <Card
          suit={card}
          key={index}
          onDoubleClick={() => onCardDoubleClick(card)}
        />
      ))}
    </Container>
  );
};
