import * as React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const [game, setGame] = React.useState("");
  return (
    <div>
      <div>Home</div>
      <div>
        <div>
          <button
            type="button"
            onClick={() => {
              history.push("/game");
            }}
          >
            New Game
          </button>
        </div>
        <div>
          <input
            style={{ border: "1px solid black" }}
            onChange={e => {
              setGame(e.target.value);
            }}
            value={game}
          />
          <button
            type="button"
            onClick={() => {
              history.push(`/game/${game}`);
            }}
          >
            join Game
          </button>
        </div>
      </div>
    </div>
  );
};
