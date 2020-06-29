import * as React from 'react';
import {useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';
import {Redirect} from 'react-router-dom';

import {DnDFrame, SpacedContent} from 'component/base';

import {CharacterList} from './CharacterList';

export const CharacterSelect = () => {
  const fireStore = useFirestore();

  const {game, gameID, uid} = useSelector(
    ({game: {activeGame}, firebase: {auth}, firestore: {data}}) => ({
      game: data.games[activeGame],
      gameID: activeGame,
      uid: auth.uid,
    })
  );

  const {player1, player2, heroes, activePlayer} = game;
  const isPlayer1 = player1.uid === uid;

  const selectCharacter = character => {
    const playerKey = isPlayer1 ? 'player1' : 'player2';
    if (game.activePlayer === playerKey) {
      const myHeroes = game[playerKey].heroes;
      let nextPlayer = activePlayer;

      if (player1.hand.length + player2.hand.length < 5) {
        nextPlayer = activePlayer === 'player1' ? 'player2' : 'player1';
      }

      fireStore
        .collection('games')
        .doc(gameID)
        .update({
          heroes: heroes.filter(hero => hero !== character),
          [`${playerKey}.heroes`]: [...myHeroes, character],
          activePlayer: nextPlayer,
        });
    }
  };

  if (player1.heroes.length === 3 && player2.heroes.length === 3) {
    return <Redirect to="/board" />;
  }

  return (
    <DnDFrame style={{width: '100%', height: 600}}>
      <SpacedContent>
        <SpacedContent space={1} horizontal>
          {game[activePlayer].name} is selecting...
        </SpacedContent>
        <SpacedContent horizontal space={8}>
          <CharacterList
            label={player1.name}
            characters={player1.heroes}
            onDrop={player1.uid === uid ? selectCharacter : null}
            type="ally"
          />
          <CharacterList characters={heroes} label="Heroes" type="heroes" />
          <CharacterList
            characters={player2.heroes}
            label={player2.name}
            onDrop={player2.uid === uid ? selectCharacter : null}
            type="enemy"
          />
        </SpacedContent>
      </SpacedContent>
    </DnDFrame>
  );
};
