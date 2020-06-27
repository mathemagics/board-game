import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore, useFirestoreConnect} from 'react-redux-firebase';

import {CharacterSelect} from '../CharacterSelect';
import {GameBoard} from '../GameBoard';

export const Game = () => {
  useFirestoreConnect([
    {
      collection: 'games',
      doc: gameID,
      limit: 1,
    },
  ]);

  const game = useSelector(({firestore: {data}}) => {
    return data.games && data.games[gameID];
  });

  const fireStore = useFirestore();
  const {uid} = useSelector(state => state.firebase.auth);

  if (!game.players[uid] && Object.keys(game.players).length < 2) {
    const newPlayer = createPlayer(uid);
    fireStore
      .collection('games')
      .doc(gameID)
      .update({[`players.${uid}`]: newPlayer});
  }

  return game.phase === 'character' ? (
    <CharacterSelect gameID={gameID} />
  ) : (
    <GameBoard gameID={gameID} />
  );
};
