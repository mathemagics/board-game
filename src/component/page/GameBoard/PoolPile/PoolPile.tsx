import * as React from 'react';

import {Label} from 'component/base/Label';

import {Card} from 'game/card';
import {Container, Cards} from './PoolPile.style';
import {PoolCard} from './PoolCard';

interface PoolPileProps {
  pool: Card[];
  onDrop: ({suit: handCard}: {suit: Card}, poolCard: Card) => void;
  onCardDoubleClick: (card: Card) => void;
}

export const PoolPile: React.FC<PoolPileProps> = ({
  pool,
  onDrop,
  onCardDoubleClick,
}) => {
  // TODO dedupe this and card group
  return (
    <Container>
      <Label>Pool:</Label>
      <Cards>
        {pool.map((card, index) => (
          <PoolCard
            from="pool"
            key={index}
            onDrop={onDrop}
            onDoubleClick={onCardDoubleClick}
            suit={card}
          />
        ))}
      </Cards>
    </Container>
  );
};
