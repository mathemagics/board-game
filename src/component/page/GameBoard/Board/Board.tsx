import * as React from 'react';
import {Text, HexUtils} from 'react-hexgrid';

import {Map, Hex} from './Board.styles';

export const Board = ({board, updateBoard, onHeroClick}) => {
  const [next, setNext] = React.useState();

  const onDrop = React.useCallback(
    (event, source, targetProps) => {
      console.log('Board onDropping');
      if (targetProps.data.new) {
        const hexas = board.map(hex => {
          const result = {...hex};
          if (HexUtils.equals(source.state.hex, hex)) {
            result.text = targetProps.data.text;
          }
          return result;
        });

        updateBoard(hexas);
      }
      setNext({hex: source.state.hex, text: targetProps.data.text});
    },
    [board, next]
  );

  const onDragStart = React.useCallback((event, source) => {
    // If this tile is empty, let's disallow drag
    if (!source.props.data.text) {
      event.preventDefault();
    }
  });

  const onDragOver = React.useCallback(
    (event, source) => {
      // Find blocked hexagons by their 'blocked' attribute
      const blockedHexas = board.filter(h => h.blocked);
      // Find if this hexagon is listed in blocked ones
      const blocked = blockedHexas.find(blockedHex =>
        HexUtils.equals(source.state.hex, blockedHex)
      );

      const {text} = source.props.data;
      // Allow drop, if not blocked and there's no content already
      if (!blocked && !text) {
        // Call preventDefault if you want to allow drop
        event.preventDefault();
      }
    },
    [board]
  );

  const onDragEnd = React.useCallback(
    (event, source, success) => {
      if (!success) {
        return;
      }

      const hexas = board.map(hex => {
        const result = {...hex};
        if (HexUtils.equals(source.state.hex, hex)) {
          result.text = null;
        }
        if (next && HexUtils.equals(next.hex, hex)) {
          result.text = next.text;
        }
        return result;
      });

      updateBoard(hexas);
    },
    [board, next]
  );

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

        const drawing = hex.q === 0 && hex.r === 0 && hex.s === 0;
        return (
          <Hex
            starting={starting}
            drawing={drawing}
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
