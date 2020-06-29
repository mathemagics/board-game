import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';

import {DnDFrame, SpacedContent} from 'component/base';

import {CharacterList} from './CharacterList';

export const CharacterSelect = () => {
  const fireStore = useFirestore();

  const {gameID, myName, uid} = useSelector(({game, firebase: {auth}}) => ({
    gameID: game.activeGame,
    uid: auth.uid,
    myName: auth.displayName,
  }));

  const {player1, player2, heroes} = useSelector(
    ({firestore: {data}}) => data.games && data.games[gameID]
  );

  const isPlayer1 = player1 && player1.uid === uid;
  const myPlayer = isPlayer1 ? player1 : player2;
  const myPlayerKey = isPlayer1 ? 'player1' : 'player2';
  const enemy = isPlayer1 ? player2 : player1;

  const {heroes: myHeroes} = myPlayer;

  if (!enemy) {
    return <div>waiting for opponent</div>;
  }
  const {heroes: enemyHeroes, name: enemyName} = enemy;

  const selectCharacter = character => {
    fireStore
      .collection('games')
      .doc(gameID)
      .update({
        heroes: heroes.filter(hero => hero !== character),
        [`${myPlayerKey}.heroes`]: [...myHeroes, character],
      });
  };

  return (
    <DnDFrame style={{width: '100%', height: 600}}>
      <SpacedContent horizontal space={8}>
        <CharacterList
          label={myName}
          characters={myHeroes}
          onDrop={selectCharacter}
          type="ally"
        />
        <CharacterList characters={heroes} label="Heroes" type="heroes" />
        <CharacterList
          characters={enemyHeroes}
          label={enemyName}
          onDrop={selectCharacter}
          type="enemy"
        />
      </SpacedContent>
    </DnDFrame>
  );
};
