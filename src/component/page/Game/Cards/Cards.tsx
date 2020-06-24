import * as React from "react";
import Card from "component/base/Card";

import {
  Button,
  Container,
  Controls,
  Hand,
  Info,
  InfoBar
} from "./Cards.style";

export default ({
  deck,
  discard,
  hand,
  onDraw,
  onDiscard,
  onReshuffle,
  onTakeDiscard
}) => {
  return (
    <Container>
      <InfoBar>
        <Info>Deck: {deck.length}</Info>
        <Info>Discard: {discard.length}</Info>

        <span style={{ marginLeft: 16, width: 142 }}>
          <span style={{ marginRight: 8 }}>Last Discard:</span>
          {discard.length > 0 && (
            <Card
              suit={discard[discard.length - 1]}
              onDoubleClick={onTakeDiscard}
            />
          )}
        </span>
      </InfoBar>
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
