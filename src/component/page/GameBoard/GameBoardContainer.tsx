import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {HexGrid} from 'react-hexgrid';

import {Board} from './Board';
import {Cards} from './Cards';
import {Objects} from './Objects';

import {
  selectActiveGame,
  selectActivePlayer,
  selectMyPlayer,
  updateGame,
} from '../Game/GameDuck';

export const GameBoard = () => {
  const dispatch = useDispatch();
  const game = useSelector(selectActiveGame);
  const activePlayer = useSelector(selectActivePlayer);
  const myPlayer = useSelector(selectMyPlayer);

  const updateBoard = board => {
    dispatch(updateGame({board}));
  };

  const endTurn = () => {
    // TODO figure out all this logic
    const nextPlayer = activePlayer === 'player1' ? 'player2' : 'player1';
    dispatch(updateGame({activePlayer: nextPlayer}));
  };

  return (
    <>
      <div>Turn: {game[activePlayer].name}</div>
      <HexGrid width={1000} height={550} viewBox="-65 -50 100 100">
        <Board updateBoard={updateBoard} board={game.board} />
        <Objects objects={game.objects} />
      </HexGrid>
      <Cards
        deck={game.deck}
        discard={game.discard}
        hand={myPlayer.hand}
        pool={game.pool}
        updateGame={args => dispatch(updateGame(args))}
      />
      <button type="button" onClick={endTurn}>
        End Turn
      </button>
    </>
  );
};
