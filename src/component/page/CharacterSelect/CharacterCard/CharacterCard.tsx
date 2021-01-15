import * as React from 'react';
import {useDrag} from 'react-dnd';
import {Hero} from 'game/hero';

// TODO enum all the drag and drop types
export const CHARACTER_TYPE = 'character';

interface CharacterCardProps {
  character: Hero;
  type: string;
  onClick: (name: string) => void;
}

// TODO handle inspectHero to use the hero object
export const CharacterCard: React.FC<CharacterCardProps> = props => {
  const {character, type, onClick} = props;
  const [{_isDragging}, drag] = useDrag({
    item: {type: CHARACTER_TYPE, character, from: type},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      {...props}
      onClick={() => onClick(character.name)}
      role="button"
    >
      {character.name}
    </div>
  );
};
