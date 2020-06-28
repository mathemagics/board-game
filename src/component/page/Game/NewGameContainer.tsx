import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

import {createGame} from 'game/game';
import {setActiveGame} from './GameDuck';

import {Game} from './GameContainer';

export const NewGame = () => {
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const setGameID = React.useCallback(
    gameID => dispatch(setActiveGame(gameID)),
    [dispatch]
  );

  const {uid, gameID} = useSelector(({firebase, game}) => ({
    uid: firebase.auth.uid,
    gameID: game.activeGame,
  }));

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
