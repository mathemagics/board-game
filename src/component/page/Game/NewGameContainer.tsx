import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

import {createGame} from 'game/game';

import {Game} from './GameContainer';

export const NewGame = () => {
  const [gameID, setGameID] = React.useState();

  const firestore = useFirestore();
  const {uid} = useSelector(state => state.firebase.auth);

  React.useEffect(() => {
    const newGame = createGame({userID: uid});

    firestore
      .collection('games')
      .add(newGame)
      .then(game => {
        setGameID(game.id);
      });
  }, []);

  return gameID ? <Game /> : <div>Creating game...</div>;
};
