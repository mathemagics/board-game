import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';
import {Redirect} from 'react-router-dom';

import {createPlayer} from 'game/player';

export const PreGame = () => {
  const firestore = useFirestore();

  const {currentGameID} = useSelector(({game}) => ({
    currentGameID: game.activeGame,
  }));

  const {game, gameID, myName, uid} = useSelector(
    ({game: {activeGame}, firebase: {auth}, firestore: {data}}) => ({
      gameID: activeGame,
      uid: auth.uid,
      myName: auth.displayName,
      game: data.games[currentGameID],
    })
  );

  React.useEffect(() => {
    if (
      (game.player1 && game.player1.uid === uid) ||
      (game.player2 && game.player2.uid === uid)
    ) {
      return;
    }
    const newPlayer = createPlayer({userID: uid, name: myName});
    const playerKey = game.player1 ? 'player2' : 'player1';

    firestore
      .collection('games')
      .doc(gameID)
      .update({[playerKey]: newPlayer});
  }, []);

  const {player1, player2} = useSelector(
    ({firestore: {data}}) => data.games[gameID]
  );

  return player1 && player2 ? (
    <Redirect to="/character" />
  ) : (
    'Waiting for opponent...'
  );
};
