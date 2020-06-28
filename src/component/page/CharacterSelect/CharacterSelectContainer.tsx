import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

export const CharacterSelect = () => {
  const fireStore = useFirestore();

  const {gameID, uid} = useSelector(({game, firebase: {auth}}) => ({
    gameID: game.activeGame,
    uid: auth.uid,
  }));

  const gameState = useSelector(
    ({firestore: {data}}) => data.games && data.games[gameID]
  );

  React.useEffect(() => {
    if (!gameState.players[uid] && Object.keys(gameState.players).length < 2) {
      const newPlayer = createPlayer(uid);
      fireStore
        .collection('games')
        .doc(gameID)
        .update({[`players.${uid}`]: newPlayer});
    }
  }, []);

  if (!gameState) {
    return <div>Loading Game...</div>;
  }

  return (
    <div>
      <div>Heroes</div>
      <div />
      <div>Player 1 Heroes</div>
      <div />
      <div>Player 2 Heroes</div>
      <div />
    </div>
  );
};
