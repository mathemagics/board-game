import * as React from "react";
import Card from "component/base/Card";
import { useFirestore } from "react-redux-firebase";

import { drawCard } from "game/card";

import { Button, Container, Controls, Hand, Remaining } from "./Cards.style";

export default ({ hand1, hand2, gameID, deck }: { deck: [string] }) => {
  const fireStore = useFirestore();

  const handleDraw = React.useCallback(() => {
    const [card, newDeck] = drawCard(deck);
    const newHand = [...hand1, card];
    fireStore
      .collection("games")
      .doc(gameID)
      .update({ hand1: newHand, deck: newDeck });
  }, [gameID, deck]);

  return (
    <Container>
      <Remaining>Remaining Cards: {deck.length}</Remaining>
      <Controls>
        <Button type="Button" onClick={handleDraw}>
          Draw
        </Button>
      </Controls>
      <Hand>
        {hand1
          .slice()
          .sort()
          .map((card, index) => (
            <Card suit={card} key={index} />
          ))}
      </Hand>
    </Container>
  );
};
