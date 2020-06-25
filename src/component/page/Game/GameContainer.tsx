import * as React from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { HexGrid } from "react-hexgrid";
import { useParams } from "react-router-dom";

import { createPlayer } from "game/player";

import Board from "./Board";
import Cards from "./Cards";
import Heroes from "./Heroes";
import Objects from "./Objects";

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

  const updateObjects = objects => {
    updateGame({ objects });
  };

  const updatePlayer = player => {
    updateGame({ [`players.${uid}`]: player });
  };

  if (!game.players[uid]) {
    updatePlayer(createPlayer(uid));
  }

  const currentHand = (game.players[uid] && game.players[uid].hand) || [];

  return (
    <div>
      <HexGrid width={1000} height={550} viewBox="-65 -50 100 100">
        <Board updateBoard={updateBoard} board={game.board} />
        <Heroes updateHeroes={updateHeroes} heroes={game.heroes} />
        <Objects updateObjects={updateObjects} objects={game.objects} />
      </HexGrid>
      {game.players[uid] && (
        <Cards
          deck={game.deck}
          discard={game.discard}
          hand={currentHand}
          pool={game.pool}
          updateGame={updateGame}
        />
      )}
    </div>
  );
};
