import * as React from "react";
import { HexGrid } from "react-hexgrid";
import GameLayout from "./GameLayout";
import TilesLayout from "./TileLayout";

export default ({ game, gameID }) => (
  <div className="app">
    <div style={{ fontSize: 20 }}>{gameID}</div>
    <HexGrid width={1600} height={900} viewBox="-32 -35 100 100">
      {game.board && <GameLayout gameID={gameID} board={game.board} />}
      {game.heroes && <TilesLayout gameID={gameID} heroes={game.heroes} />}
    </HexGrid>
  </div>
);
