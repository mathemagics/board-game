import * as React from "react";
import { useSelector } from "react-redux";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { GridGenerator, HexGrid } from "react-hexgrid";

import { heroes as defaultHeroes } from "game/hero";
import Board from "./Board";
import Heroes from "./Heroes";
import Cards from "./Cards";

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

  return game ? (
    <div className="app">
      <div style={{ fontSize: 20 }}>{gameID}</div>
      <HexGrid width={1600} height={900} viewBox="-32 -35 100 100">
        {game.board && <Board gameID={gameID} board={game.board} />}
        {game.heroes && <Heroes gameID={gameID} heroes={game.heroes} />}
        {game.card && <Cards />}
      </HexGrid>
    </div>
  ) : null;
};
