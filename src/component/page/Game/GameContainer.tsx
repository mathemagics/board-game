import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';

import {GAME_PHASES} from 'game/game';

import {CharacterSelect} from '../CharacterSelect';
import {GameBoard} from '../GameBoard';

export const Game = () => {
  const {gameID} = useSelector(({game}) => ({
    gameID: game.activeGame,
  }));

  useFirestoreConnect([
    {
      collection: 'games',
      doc: gameID,
    },
  ]);

  const game = useSelector(({firestore: {data}}) => {
    return data.games && data.games[gameID];
  });

  if (!game) {
    return <div>loading</div>;
  }

  return game.phase === GAME_PHASES.character ? (
    <CharacterSelect />
  ) : (
    <GameBoard />
  );
};
