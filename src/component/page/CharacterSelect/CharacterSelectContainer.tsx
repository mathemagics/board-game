import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {DnDFrame, SpacedContent} from 'component/base';

import {CharacterList} from './CharacterList';

import {chooseHero, selectActiveGame, selectMyPlayer} from '../Game/GameDuck';

export const CharacterSelect = () => {
  const dispatch = useDispatch();
  const game = useSelector(selectActiveGame);
  const {uid} = useSelector(selectMyPlayer);
  const {player1, player2, heroes, activePlayer} = game;

  const onDrop = character => dispatch(chooseHero(character));

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
            onDrop={player1.uid === uid ? onDrop : null}
            type="ally"
          />
          <CharacterList characters={heroes} label="Heroes" type="heroes" />
          <CharacterList
            characters={player2.heroes}
            label={player2.name}
            onDrop={player2.uid === uid ? onDrop : null}
            type="enemy"
          />
        </SpacedContent>
      </SpacedContent>
    </DnDFrame>
  );
};
