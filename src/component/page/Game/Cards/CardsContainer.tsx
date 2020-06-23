import * as React from "react";
import { useFirestore } from "react-redux-firebase";

import { drawCard } from "game/card";

import Cards from "./Cards";

export default ({ hand, updateDeck, deck }: { deck: [string] }) => {
  const fireStore = useFirestore();

  const handleDraw = React.useCallback(() => {
    const [card, newDeck] = drawCard(deck);
    const newHand = [...hand1, card];
  }, [gameID, deck]);

  return (
    <Cards deck={deck} hand={hand} discard={discard} onDraw={handleDraw} />
  );
};
