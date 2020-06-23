import * as React from "react";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import { createGame } from "game/game";

export default () => {
  const [gameID, setGameID] = React.useState();

  const firestore = useFirestore();
  const auth = useSelector(state => state.firebase.auth);

  React.useEffect(() => {
    const newGame = createGame({ userID: auth.uid });

    firestore
      .collection("games")
      .add(newGame)
      .then(game => {
        setGameID(game.id);
      });
  }, []);

  if (!gameID) {
    return <div>Creating game...</div>;
  }

  return <Redirect to={{ pathname: `${gameID}` }} />;
};
