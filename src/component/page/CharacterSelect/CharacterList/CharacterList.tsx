import * as React from 'react';
import {useDrop} from 'react-dnd';
import {Label, SpacedContent} from 'component/base';

import {CharacterCard, CHARACTER_TYPE} from '../CharacterCard';

export const CharacterList = ({characters, label, onDrop, type}) => {
  const [{isOver, canDrop}, drop] = useDrop({
    accept: CHARACTER_TYPE,
    canDrop: ({from}) => {
      // TODO tokenize
      const allowedFrom = ['heroes'];
      return type !== 'heroes' && allowedFrom.includes(from);
    },
    drop: ({character}) => onDrop(character),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <SpacedContent ref={drop}>
      <Label>{label}</Label>
      <SpacedContent ref={drop}>
        {characters.map(character => (
          <CharacterCard key={character} character={character} type={type} />
        ))}
      </SpacedContent>
    </SpacedContent>
  );
};
