import * as React from "react";
import Card from "component/base/Card";

import { Button, Container, Controls, Hand, Info } from "./Cards.style";

export default ({ deck, discard, hand, onDraw, onDiscard, onReshuffle }) => {
  return (
    <Container>
      <div>
        <Info>Remaining Cards: {deck.length}</Info>
        <Info>Discarded Cards: {discard.length}</Info>
      </div>
      <Controls>
        <Button type="button" onClick={onDraw}>
          Draw
        </Button>
        <Button type="button" onClick={onReshuffle}>
          Reshuffle
        </Button>
      </Controls>
      <Hand>
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
    </Container>
  );
};
