import * as React from 'react';
import {useDrag} from 'react-dnd';

// TODO enum all the drag and drop types
export const CHARACTER_TYPE = 'character';

export const CharacterCard = props => {
  const {character, type} = props;
  const [{_isDragging}, drag] = useDrag({
    item: {type: CHARACTER_TYPE, character, from: type},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div ref={drag} {...props}>
      {character}
    </div>
  );
};
