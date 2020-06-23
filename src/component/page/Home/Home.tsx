import * as React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const [gameID, setGameID] = React.useState("");
  return (
    <div>
      <div>
        <div>
          <button
            type="button"
            onClick={() => {
              history.push("/game/new");
            }}
          >
            New Game
          </button>
        </div>
        <div>
          <input
            style={{ border: "1px solid black" }}
            onChange={e => {
              setGameID(e.target.value);
            }}
            value={gameID}
          />
          <button
            type="button"
            onClick={() => {
              history.push(`/game/${gameID}`);
            }}
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
};
