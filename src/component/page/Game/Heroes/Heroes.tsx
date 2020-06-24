import * as React from "react";

import { Hexagon, Text, Pattern, HexUtils } from "react-hexgrid";

import { Map } from "./Heroes.styles";

const Heroes = ({ heroes, updateHeroes }) => {
  const onDragStart = (_event, _source) => {
    // Could do something on onDragStart as well, if you wish
  };

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  const onDragEnd = (event, source, success) => {
    if (!success) {
      return;
    }
    // TODO Drop the whole hex from array, currently somethings wrong with the patterns
    // const hexas = heroes.filter(hex => !HexUtils.equals(targetHex, hex));
    const hexas = heroes.map(hex => {
      const result = { ...hex };
      if (HexUtils.equals(source.state.hex, hex)) {
        result.text = null;
        result.image = null;
      }
      return result;
    });

    updateHeroes(hexas);
  };

  return (
    <Map
      size={{ x: 6, y: 6 }}
      flat={false}
      spacing={1.01}
      origin={{ x: 40, y: -30 }}
    >
      {heroes.map((hex, i) => (
        <Hexagon
          key={i}
          q={hex.q}
          r={hex.r}
          s={hex.s}
          fill={hex.image ? HexUtils.getID(hex) : null}
          data={{ ...hex, new: true }}
          onDragStart={(e, h) => onDragStart(e, h)}
          onDragEnd={(e, h, s) => onDragEnd(e, h, s)}
        >
          <Text>{hex.text}</Text>
          {!!hex.image && <Pattern id={HexUtils.getID(hex)} link={hex.image} />}
        </Hexagon>
      ))}
    </Map>
  );
};

export default Heroes;
