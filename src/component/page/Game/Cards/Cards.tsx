import * as React from "react";
import Card from "component/base/Card";

import { Button, Container, Controls, Hand, Info } from "./Cards.style";

export default ({ deck, discard, hand, onDraw, onDiscard }) => {
  return (
    <Container>
      <div>
        <Info>Remaining Cards: {deck.length}</Info>
        <Info>Discarded Cards: {discard.length}</Info>
      </div>
      <Controls>
        <Button type="Button" onClick={onDraw}>
          Draw
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
