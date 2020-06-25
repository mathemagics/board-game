import * as React from 'react';

import {Label} from 'component/base/Label';

import {Container, Cards} from './CardGroup.style';
import {Card} from '../Card';

export const CardGroup = ({cards, label, isSorted, onCardDoubleClick}) => {
  const orderedCards = isSorted ? cards.slice().sort() : cards;

  return (
    <Container>
      <Label>{label}</Label>
      <Cards>
        {orderedCards.map((card, index) => (
          <Card
            suit={card}
            key={index}
            onDoubleClick={() => onCardDoubleClick(card)}
          />
        ))}
      </Cards>
    </Container>
  );
};
