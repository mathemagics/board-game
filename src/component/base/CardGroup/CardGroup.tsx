import * as React from 'react';

import {Label} from 'component/base/Label';

import {Container, Cards} from './CardGroup.style';
import {ElementCard} from '../ElementCard';

export const CardGroup = React.forwardRef(
  ({cards = [], label, name, isSorted, onCardDoubleClick = () => {}}, ref) => {
    const orderedCards = isSorted ? cards.slice().sort() : cards;

    return (
      <Container ref={ref}>
        <Label>{label}</Label>
        <Cards>
          {orderedCards.map((card, index) => (
            <ElementCard
              from={name}
              suit={card}
              key={index}
              onDoubleClick={() => onCardDoubleClick(card)}
            />
          ))}
        </Cards>
      </Container>
    );
  }
);
