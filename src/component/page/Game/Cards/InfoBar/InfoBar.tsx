import * as React from 'react';

import {Card} from 'component/base/Card';

import {Container, Info, Pool} from './InfoBar.styles';

export const InfoBar = ({
  deckCount,
  discardCount,
  lastDiscard,
  onTakeDiscard,
  onPoolDraw,
  pool
}) => {
  return (
    <Container>
      <Info>Deck: {deckCount}</Info>
      <Info>Discard: {discardCount}</Info>
      <Info>Pool:</Info>
      <Pool>
        {pool.map((card, index) => (
          <Card
            suit={card}
            key={index}
            onDoubleClick={() => onPoolDraw(card)}
          />
        ))}
      </Pool>
      <Info style={{marginRight: 8}}>Last Discard:</Info>
      <span>
        {discardCount > 0 && (
          <Card suit={lastDiscard} onDoubleClick={onTakeDiscard} />
        )}
      </span>
    </Container>
  );
};
