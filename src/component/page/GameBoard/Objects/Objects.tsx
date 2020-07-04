import * as React from 'react';

import {Hexagon, Text, HexUtils} from 'react-hexgrid';

import {Map} from './Objects.styles';

export const Objects = ({objects}) => {
  const onDragStart = () => {};

  return (
    <Map
      size={{x: 6, y: 6}}
      flat={false}
      spacing={1.01}
      origin={{x: 12, y: -30}}
    >
      {objects.map((hex, i) => (
        <Hexagon
          key={i}
          q={hex.q}
          r={hex.r}
          s={hex.s}
          fill={hex.image ? HexUtils.getID(hex) : null}
          data={{...hex, new: true}}
          onDragStart={(e, h) => onDragStart(e, h)}
        >
          <Text>{hex.text}</Text>
        </Hexagon>
      ))}
    </Map>
  );
};
