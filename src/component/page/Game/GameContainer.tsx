import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {MemoryRouter, Route, useParams} from 'react-router-dom';

import {PreGame} from '../PreGame';
import {CharacterSelect} from '../CharacterSelect';
import {GameBoard} from '../GameBoard';

import {setActiveGame} from './GameDuck';

export const Game = () => {
  const {gameID} = useParams();
  const dispatch = useDispatch();

  const setGameID = React.useCallback(
    aGameID => dispatch(setActiveGame(aGameID)),
    [dispatch]
  );

  React.useEffect(() => {
    if (gameID) {
      setGameID(gameID);
    }
  }, []);

  const {currentGameID} = useSelector(({game}) => ({
    currentGameID: game.activeGame,
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

  if (!game) {
    return <div>Loading Game...</div>;
  }

  return (
    <MemoryRouter>
      <Route exact path="/" component={PreGame} />
      <Route path="/character" component={CharacterSelect} />
      <Route path="/board" component={GameBoard} />
    </MemoryRouter>
  );
};
