import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {createNewGame, selectActiveGameID} from '../Game/GameDuck';

export const NewGame = () => {
  const dispatch = useDispatch();
  const activeGameID = useSelector(selectActiveGameID);

  React.useEffect(() => {
    dispatch(createNewGame());
  }, []);

  return activeGameID ? (
    <Redirect to={{pathname: `${activeGameID}`}} />
  ) : (
    <div>Creating game...</div>
  );
};
