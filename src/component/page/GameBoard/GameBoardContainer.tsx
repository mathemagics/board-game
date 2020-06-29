import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';
import {HexGrid} from 'react-hexgrid';

import {SpacedContent} from 'component/base';

import {Board} from './Board';
import {Cards} from './Cards';
import {Objects} from './Objects';

export const GameBoard = () => {
  const fireStore = useFirestore();

  const {activePlayer, game, gameID, uid} = useSelector(
    ({game: {activeGame}, firebase: {auth}, firestore: {data}}) => ({
      activePlayer: data.games[activeGame].activePlayer,
      game: data.games[activeGame],
      gameID: activeGame,
      uid: auth.uid,
    })
  );

  const {player1, player2} = game;
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
      <div space={1} horizontal>
        Turn: {game[activePlayer].name}
      </div>
      <button type="button" onClick={endTurn}>
        End Turn
      </button>
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
