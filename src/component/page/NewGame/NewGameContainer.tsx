import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';
import {Redirect} from 'react-router-dom';

import {createGame} from 'game/game';

import {setActiveGame} from '../Game/GameDuck';

export const NewGame = () => {
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const setGameID = React.useCallback(
    gameID => dispatch(setActiveGame(gameID)),
    [dispatch]
  );

  const {name, uid, gameID} = useSelector(({firebase, game}) => ({
    uid: firebase.auth.uid,
    name: firebase.auth.displayName,
    gameID: game.activeGame,
  }));

  React.useEffect(() => {
    const newGame = createGame({userID: uid, name});

    firestore
      .collection('games')
      .add(newGame)
      .then(game => {
        setGameID(game.id);
      });
  }, []);

  return gameID ? (
    <Redirect to={{pathname: `${gameID}`}} />
  ) : (
    'Creating game...'
  );
};
