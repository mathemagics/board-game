import * as React from 'react';
import {useDrop} from 'react-dnd';
import {Label, SpacedContent} from 'component/base';

import {CharacterCard, CHARACTER_TYPE} from '../CharacterCard';

// TODO dont' add drop handlers if no onDrop
export const CharacterList = ({characters, label, onDrop, type}) => {
  const [_, drop] = useDrop({
    accept: CHARACTER_TYPE,
    canDrop: ({from}) => from === 'heroes',
    drop: ({character}) => {
      if (onDrop) {
        onDrop(character);
      }
    },
  });
  return (
    <SpacedContent ref={drop}>
      <Label>{label}</Label>
      <SpacedContent ref={drop} header={2}>
        {characters.map(character => (
          <CharacterCard key={character} character={character} type={type} />
        ))}
      </SpacedContent>
    </SpacedContent>
  );
};
