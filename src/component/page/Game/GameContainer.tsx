import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {MemoryRouter, Route, useParams} from 'react-router-dom';

import {PreGame} from '../PreGame';
import {CharacterSelect} from '../CharacterSelect';
import {GameBoard} from '../GameBoard';

import {setActiveGame, selectActiveGameID, selectActiveGame} from './GameDuck';

export const Game = () => {
  const {gameID} = useParams<{gameID: string}>();
  const dispatch = useDispatch();

  // TODO everythign with aciveGameID
  const setGameID = React.useCallback(
    aGameID => dispatch(setActiveGame(aGameID)),
    [dispatch]
  );

  React.useEffect(() => {
    if (gameID) {
      setGameID(gameID);
    }
  }, []);

  const activeGameId = useSelector(selectActiveGameID);

  useFirestoreConnect([
    {
      collection: 'games',
      doc: activeGameId,
    },
  ]);

  const game = useSelector(selectActiveGame);

  return game ? (
    <MemoryRouter>
      <Route exact path="/" component={PreGame} />
      <Route path="/character" component={CharacterSelect} />
      <Route path="/board" component={GameBoard} />
    </MemoryRouter>
  ) : (
    <div>Loading Game...</div>
  );
};
