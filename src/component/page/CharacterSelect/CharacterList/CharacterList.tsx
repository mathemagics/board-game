import * as React from 'react';
import {useDrop} from 'react-dnd';
import {Label, SpacedContent} from 'component/base';

import {Hero} from 'game/hero';

import {CharacterCard, CHARACTER_TYPE} from '../CharacterCard';

interface CharacterListProps {
  characters: Hero[];
  label: string;
  onDrop?: (hero: Hero) => void;
  type: string;
  onHeroClick?: (hero: string) => void;
}

// TODO dont' add drop handlers if no onDrop
// TODO ename Character -> Hero
export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  label,
  onDrop,
  type,
  onHeroClick,
}) => {
  const [_, drop] = useDrop({
    accept: CHARACTER_TYPE,
    canDrop: ({from}: {from: string}) => from === 'heroes',
    drop: ({character}: {character: Hero}) => {
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
          <CharacterCard
            key={character.name}
            character={character}
            type={type}
            onClick={onHeroClick}
          />
        ))}
      </SpacedContent>
    </SpacedContent>
  );
};
