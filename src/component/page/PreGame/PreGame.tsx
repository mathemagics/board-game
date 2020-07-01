import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {selectPlayer1, selectPlayer2, addPlayer} from '../Game/GameDuck';

export const PreGame = () => {
  const dispatch = useDispatch();

  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);

  React.useEffect(() => {
    if (!player1 || !player2) {
      dispatch(addPlayer());
    }
  }, []);

  return player1 && player2 ? (
    <Redirect to="/character" />
  ) : (
    'Waiting for opponent...'
  );
};
