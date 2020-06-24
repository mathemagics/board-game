import * as React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const [gameID, setGameID] = React.useState("");
  return (
    <div>
      <div>
        <div style={{ marginBottom: 24 }}>
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
          <button
            type="button"
            onClick={() => {
              history.push(`/game/${gameID}`);
            }}
          >
            Join Game:
          </button>
          <input
            style={{ border: "1px solid black", marginLeft: 8 }}
            onChange={e => {
              setGameID(e.target.value);
            }}
            value={gameID}
          />
        </div>
      </div>
    </div>
  );
};
