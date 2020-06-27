import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';
import {HexGrid} from 'react-hexgrid';

import {Board} from './Board';
import {Cards} from './Cards';
import {Objects} from './Objects';

export const GameBoard = ({gameID}) => {
  const fireStore = useFirestore();
  const {uid} = useSelector(state => state.firebase.auth);

  const game = useSelector(
    ({firestore: {data}}) => data.games && data.games[gameID]
  );

  if (!game) {
    return <div>Loading Game...</div>;
  }

  console.log('gggg', game);

  const updateGame = args => {
    fireStore
      .collection('games')
      .doc(gameID)
      .update(args);
  };

  const updateBoard = board => {
    updateGame({board});
  };

  const currentHand = (game.players[uid] && game.players[uid].hand) || [];

  return (
    <>
      <HexGrid width={1000} height={550} viewBox="-65 -50 100 100">
        <Board updateBoard={updateBoard} board={game.board} />
        <Objects objects={game.objects} />
      </HexGrid>
      {game.players[uid] && (
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
