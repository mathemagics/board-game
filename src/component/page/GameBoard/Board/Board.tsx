import * as React from 'react';
import {Text, HexUtils} from 'react-hexgrid';

import {Map, Hex} from './Board.styles';

export const Board = ({board, updateBoard, onHeroClick}) => {
  const onDrop = React.useCallback(
    (event, source, targetProps) => {
      const hexas = board.map(hex => {
        const result = {...hex};
        if (HexUtils.equals(source.state.hex, hex)) {
          result.text = targetProps.data.text;
        }
        if (HexUtils.equals(targetProps.data, hex) && !targetProps.data.new) {
          result.text = null;
        }
        return result;
      });
      updateBoard(hexas);
    },
    [board]
  );

  const onDragStart = React.useCallback((event, source) => {
    // If this tile is empty, let's disallow drag
    if (!source.props.data.text) {
      event.preventDefault();
    }
  });

  const onDragOver = React.useCallback(
    (event, source) => {
      const {text} = source.props.data;
      if (!text) {
        // Call preventDefault if you want to allow drop
        event.preventDefault();
      }
    },
    [board]
  );

  const onDragEnd = React.useCallback((event, source, success) => {});

  return (
    <Map
      size={{x: 5.5, y: 5.5}}
      flat={false}
      spacing={1.01}
      origin={{x: -40, y: 0}}
    >
      {board.map((hex, i) => {
        const starting =
          (hex.r === -5 && hex.s > 0 && hex.s < 5) ||
          (hex.r === -4 && hex.s > 0 && hex.s < 4) ||
          (hex.r === 5 && hex.q < 0 && hex.q > -5) ||
          (hex.r === 4 && hex.q < 0 && hex.q > -4);

        return (
          <Hex
            starting={starting}
            key={i}
            q={hex.q}
            r={hex.r}
            s={hex.s}
            fill={hex.image ? HexUtils.getID(hex) : null}
            data={hex}
            onDragStart={(e, h) => onDragStart(e, h)}
            onDragEnd={(e, h, s) => onDragEnd(e, h, s)}
            onDrop={(e, h, t) => onDrop(e, h, t)}
            onDragOver={(e, h) => onDragOver(e, h)}
            onClick={() => onHeroClick(hex.text)}
          >
            <Text>{hex.text}</Text>
          </Hex>
        );
      })}
    </Map>
  );
};
