import * as React from 'react';

import {Hexagon, Text, HexUtils} from 'react-hexgrid';

import {Map} from './Objects.styles';

export const Objects = ({objects}) => {
  const onDragStart = () => {};
  const onDragEnd = () => {};
  const onDragOver = () => {};

  return (
    <Map
      size={{x: 6, y: 6}}
      flat={false}
      spacing={1.01}
      origin={{x: 40, y: 20}}
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
          onDragEnd={(e, h, s) => onDragEnd(e, h, s)}
          onDragOver={(e, h) => onDragOver(e, h)}
        >
          <Text>{hex.text}</Text>
        </Hexagon>
      ))}
    </Map>
  );
};
