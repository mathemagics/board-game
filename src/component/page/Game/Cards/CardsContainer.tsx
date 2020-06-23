import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { drawCard, discardCard, shuffle } from "game/card";

import Cards from "./Cards";

export default ({ updateGame }: { deck: [string] }) => {
  const { gameID } = useParams();
  const { uid } = useSelector(state => state.firebase.auth);
  const {
    players: {
      [uid]: { hand }
    },
    deck,
    discard
  } = useSelector(
    ({ firestore: { data } }) => data.games && data.games[gameID]
  );

  const handleDraw = () => {
    const [card, newDeck] = drawCard(deck);
    const newHand = [...hand, card];
    updateGame({ deck: newDeck, [`players.${uid}.hand`]: newHand });
  };

  const handleDiscard = card => {
    const [newHand, newDiscard] = discardCard({ card, hand, discard });
    updateGame({ discard: newDiscard, [`players.${uid}.hand`]: newHand });
  };

  const handleReshuffle = () => {
    const combinedDeck = [...discard, ...deck];
    const newDeck = shuffle(combinedDeck);
    updateGame({ deck: newDeck, discard: [] });
  };

  return (
    <Cards
      deck={deck}
      discard={discard}
      hand={hand}
      onDiscard={handleDiscard}
      onDraw={handleDraw}
      onReshuffle={handleReshuffle}
    />
  );
};
