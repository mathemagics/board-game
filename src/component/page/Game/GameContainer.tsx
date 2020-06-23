import * as React from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { GridGenerator } from "react-hexgrid";

import { heroes as defaultHeroes } from "game/hero";

import Game from "./Game";

export default () => {
  const pathArray = window.location.pathname.split("/");
  const pathID = pathArray[2];
  const [gameID, setGameID] = React.useState(pathID);

  const firestore = useFirestore();
  useFirestoreConnect({ collection: "games" });

  React.useEffect(() => {
    if (pathID) {
      return;
    }
    const hexBoard = GridGenerator.hexagon(5);

    const hexHeroes = GridGenerator.rectangle(3, 4).map((hexagon, index) => ({
      ...hexagon,
      text: defaultHeroes[index]
    }));

    const board = hexBoard.map(hex => ({ ...hex }));
    const heroes = hexHeroes.map(hero => ({ ...hero }));

    firestore
      .collection("games")
      .add({ board, heroes })
      .then(game => {
        setGameID(game.id);
      });
  }, []);

  const game = useSelector(state => {
    return (
      gameID && state.firestore.data.games && state.firestore.data.games[gameID]
    );
  });

  return game ? <Game gameID={gameID} game={game} /> : null;
};
