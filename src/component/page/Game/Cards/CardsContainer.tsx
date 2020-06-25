import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { drawCard, discardCard, shuffle } from "game/card";

import Cards from "./Cards";

export default ({ updateGame }: { deck: [string] }) => {
  const { gameID } = useParams();
  const { uid } = useSelector(state => state.firebase.auth);
  const {
    deck,
    discard,
    players: {
      [uid]: { hand }
    },
    pool
  } = useSelector(
    ({ firestore: { data } }) => data.games && data.games[gameID]
  );

  const handleHandClick = card => {
    const [discardedHand, newDiscard] = discardCard({ card, hand, discard });
    const [drawnCard, newDeck] = drawCard(deck);
    const newHand = [...discardedHand, drawnCard];

    updateGame({
      deck: newDeck,
      discard: newDiscard,
      [`players.${uid}.hand`]: newHand
    });
  };

  const handleDraw = () => {
    const [card, newDeck] = drawCard(deck);
    const newHand = [...hand, card];
    updateGame({ deck: newDeck, [`players.${uid}.hand`]: newHand });
  };

  const handlePoolDraw = poolCard => {
    // TODO move this into game mechanics
    const newDiscard = [...discard, poolCard];
    const index = pool.indexOf(poolCard);
    const [card, newDeck] = drawCard(deck);
    const newPool = [...pool];
    newPool[index] = card;
    updateGame({
      deck: newDeck,
      discard: newDiscard,
      pool: newPool
    });
  };

  const handleReshuffle = () => {
    const combinedDeck = [...discard, ...deck];
    const newDeck = shuffle(combinedDeck);
    updateGame({ deck: newDeck, discard: [] });
  };

  const handleTakeDiscard = () => {
    const newHand = [...hand, discard[discard.length - 1]];
    const newDiscard = discard.slice(0, discard.length - 1);
    updateGame({ [`players.${uid}.hand`]: newHand, discard: newDiscard });
  };

  return (
    <Cards
      deck={deck}
      discard={discard}
      hand={hand}
      onDiscard={handleHandClick}
      onDraw={handleDraw}
      onPoolDraw={handlePoolDraw}
      onReshuffle={handleReshuffle}
      onTakeDiscard={handleTakeDiscard}
      pool={pool}
    />
  );
};
