import * as React from 'react';

import {Label} from 'component/base/Label';

import {Container, Cards} from './PoolPile.style';
import {PoolCard} from './PoolCard';

export const PoolPile = ({pool, onDrop, onCardDoubleClick}) => {
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
