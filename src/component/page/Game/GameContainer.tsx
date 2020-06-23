import * as React from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { HexGrid } from "react-hexgrid";
import { useParams } from "react-router-dom";

import { drawCard, discardCard } from "game/card";
import { createPlayer } from "game/player";

import Board from "./Board";
import Heroes from "./Heroes";
import Cards from "./Cards";

export default () => {
  const { gameID } = useParams();

  const fireStore = useFirestore();
  const { uid } = useSelector(state => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: "games",
      doc: gameID
    }
  ]);

  const game = useSelector(
    ({ firestore: { data } }) => data.games && data.games[gameID]
  );

  if (!game) {
    return <div>Loading Game...</div>;
  }

  const updateGame = args => {
    fireStore
      .collection("games")
      .doc(gameID)
      .update(args);
  };

  const updateBoard = board => {
    updateGame({ board });
  };

  const updateHeroes = heroes => {
    updateGame({ heroes });
  };

  const updatePlayer = board => {
    updateGame({ [`players.${uid}`]: player });
  };

  const handleDraw = () => {
    const previousHand = game.players[uid].hand;
    const [card, newDeck] = drawCard(game.deck);
    const newHand = [...previousHand, card];
    updateGame({ deck: newDeck, [`players.${uid}.hand`]: newHand });
  };

  const handleDiscard = card => {
    const { hand } = game.players[uid];
    const { discard } = game;
    const [newHand, newDiscard] = discardCard({ card, hand, discard });
    updateGame({ discard: newDiscard, [`players.${uid}.hand`]: newHand });
  };

  if (!game.players[uid]) {
    updatePlayer(createPlayer(uid));
  }

  return (
    <div>
      <HexGrid width={1000} height={550} viewBox="-65 -50 100 100">
        <Board updateBoard={updateBoard} board={game.board} />
        <Heroes updateHeroes={updateHeroes} heroes={game.heroes} />
      </HexGrid>
      <Cards
        deck={game.deck}
        discard={game.discard}
        hand={game.players[uid].hand}
        onDraw={handleDraw}
        onDiscard={handleDiscard}
      />
    </div>
  );
};
