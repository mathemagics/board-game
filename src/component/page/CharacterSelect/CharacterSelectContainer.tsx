import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

import {DnDFrame, Label, SpacedContent} from 'component/base';

import {CharacterList} from './CharacterList';

export const CharacterSelect = () => {
  const fireStore = useFirestore();

  const {gameID, uid} = useSelector(({game, firebase: {auth}}) => ({
    gameID: game.activeGame,
    uid: auth.uid,
  }));

  const {players, heroes} = useSelector(
    ({firestore: {data}}) => data.games && data.games[gameID]
  );

  React.useEffect(() => {
    if (!players[uid] && Object.keys(players).length < 2) {
      const newPlayer = createPlayer(uid);
      fireStore
        .collection('games')
        .doc(gameID)
        .update({[`players.${uid}`]: newPlayer});
    }
  }, []);

  const selectCharacter = () => {};

  return (
    <DnDFrame style={{width: '100%', height: 600}}>
      <SpacedContent horizontal>
        <div>
          <Label>Player 1 Heroes</Label>
          <div />
        </div>
        <div>
          <Label>Heroes</Label>
          <CharacterList characters={heroes} />
        </div>
        <div>
          <Label>Player 2 Heroes</Label>
          <div />
        </div>
      </SpacedContent>
    </DnDFrame>
  );
};
