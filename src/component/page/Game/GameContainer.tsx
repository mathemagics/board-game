import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFirestoreConnect, useFirestore} from 'react-redux-firebase';
import {useParams} from 'react-router-dom';

import {createPlayer} from 'game/player';
import {GAME_PHASES} from 'game/game';

import {CharacterSelect} from '../CharacterSelect';
import {GameBoard} from '../GameBoard';

import {setActiveGame} from './GameDuck';

export const Game = () => {
  const {gameID} = useParams();
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const setGameID = React.useCallback(
    aGameID => dispatch(setActiveGame(aGameID)),
    [dispatch]
  );

  React.useEffect(() => {
    if (gameID) {
      setGameID(gameID);
    }
  }, []);

  const {currentGameID, name, uid} = useSelector(({game, firebase}) => ({
    currentGameID: game.activeGame,
    uid: firebase.auth.uid,
    name: firebase.auth.displayName,
  }));

  useFirestoreConnect([
    {
      collection: 'games',
      doc: currentGameID,
    },
  ]);

  const game = useSelector(({firestore: {data}}) => {
    return data.games && data.games[currentGameID];
  });

  // TODO reconsider how we store players also Enum for `player1`, 'player2'
  const myPlayer =
    game && game.player1 && game.player1.uid === uid ? 'player1' : 'player2';

  React.useEffect(() => {
    if (game && !game[myPlayer] && !(game.player1 && game.player2)) {
      const newPlayer = createPlayer({userID: uid, name});

      firestore
        .collection('games')
        .doc(gameID)
        .update({[myPlayer]: newPlayer});
    }
  }, [game]);

  if (!game || !game[myPlayer]) {
    return <div>Loading Game...</div>;
  }

  return game.phase === GAME_PHASES.character ? (
    <CharacterSelect />
  ) : (
    <GameBoard />
  );
};
