import * as React from 'react';

import {SpacedContent} from 'component/base';

import {CharacterCard} from '../CharacterCard';

export const CharacterList = ({characters}) => {
  console.log('cahr', characters);
  return (
    <SpacedContent header={3}>
      {characters.map(character => (
        <CharacterCard key={character}>{character}</CharacterCard>
      ))}
    </SpacedContent>
  );
};
