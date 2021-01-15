import * as React from 'react';

import {Label} from 'component/base/Label';

import {Card} from 'game/card';

import {Container, Cards} from './CardGroup.style';
import {ElementCard} from '../ElementCard';

interface CardGroupProps {
  cards: Card[];
  label: string;
  name: string;
  isSorted?: boolean;
  onCardDoubleClick?: (card: Card) => void;
}

export const CardGroup = React.forwardRef<HTMLDivElement, CardGroupProps>(
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
