import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';
import {HexGrid} from 'react-hexgrid';

import {Board} from './Board';
import {Cards} from './Cards';
import {Objects} from './Objects';

export const GameBoard = () => {
  const fireStore = useFirestore();

  const {gameID, uid} = useSelector(({game, firebase}) => ({
    gameID: game.activeGame,
    uid: firebase.auth.uid,
  }));

  const game = useSelector(
    ({firestore: {data}}) => data.games && data.games[gameID]
  );

  if (!game) {
    return <div>Loading Game...</div>;
  }

  const isPlayer1 = player1 && player1.uid === uid;
  const myPlayer = isPlayer1 ? player1 : player2;

  const updateGame = args => {
    fireStore
      .collection('games')
      .doc(gameID)
      .update(args);
  };

  const updateBoard = board => {
    updateGame({board});
  };

  const currentHand = (myPlayer && myPlayer.hand) || [];

  return (
    <>
      <HexGrid width={1000} height={550} viewBox="-65 -50 100 100">
        <Board updateBoard={updateBoard} board={game.board} />
        <Objects objects={game.objects} />
      </HexGrid>
      {myPlayer && (
        <Cards
          deck={game.deck}
          discard={game.discard}
          hand={currentHand}
          pool={game.pool}
          updateGame={updateGame}
        />
      )}
    </>
  );
};
