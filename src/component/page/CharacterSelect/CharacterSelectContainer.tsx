import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

export const CharacterSelect = ({gameID}) => {
  const fireStore = useFirestore();
  const {uid} = useSelector(state => state.firebase.auth);

  const game = useSelector(
    ({firestore: {data}}) => data.games && data.games[gameID]
  );

  if (!game) {
    return <div>Loading Game...</div>;
  }

  return (
    <div>
      <div>Heroes</div>
      <div />
      <div>Player 1 Heroes</div>
      <div />
      <div>Player 2 Heroes</div>
      <div />
    </div>
  );
};
