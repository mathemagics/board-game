import * as React from "react";
import Card from "component/base/Card";

import {
  Button,
  Container,
  Controls,
  Hand,
  Info,
  InfoBar,
  Pool
} from "./Cards.style";

export default ({
  deck,
  discard,
  hand,
  onDraw,
  onDrawPool,
  onDiscard,
  onReshuffle,
  onTakeDiscard,
  pool
}) => {
  return (
    <Container>
      <InfoBar>
        <Info>Deck: {deck.length}</Info>
        <Info>Discard: {discard.length}</Info>
        <Info>Pool:</Info>
        <Pool>
          {pool.map((card, index) => (
            <Card
              suit={card}
              key={index}
              onDoubleClick={() => onDrawPool(card)}
            />
          ))}
        </Pool>
        <Info style={{ marginRight: 8 }}>Last Discard:</Info>
        <span>
          {discard.length > 0 && (
            <Card
              suit={discard[discard.length - 1]}
              onDoubleClick={onTakeDiscard}
            />
          )}
        </span>
      </InfoBar>
      <Hand>
        <Info>Hand:</Info>
        {hand
          .slice()
          .sort()
          .map((card, index) => (
            <Card
              suit={card}
              key={index}
              onDoubleClick={() => onDiscard(card)}
            />
          ))}
      </Hand>
      <Controls>
        <Button type="button" onClick={onDraw}>
          Draw
        </Button>
        <Button type="button" onClick={onReshuffle}>
          Reshuffle
        </Button>
      </Controls>
    </Container>
  );
};
