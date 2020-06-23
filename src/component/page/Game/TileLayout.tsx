import * as React from "react";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";

import { Layout, Hexagon, Text, Pattern, HexUtils } from "react-hexgrid";

const Map = styled(Layout)`
  background: white;

  g {
    fill: #4499a9;
    fill-opacity: 0.6;
  }

  g text {
    font-size: 1.5px;
    fill: white;
    fill-opacity: 0.7;
    transition: fill-opacity 0.5s;
  }

  path {
    fill: none;
    stroke: #7be3f6;
    stroke-width: 0.18em;
    stroke-opacity: 0.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const TilesLayout = ({ heroes, gameID }) => {
  const fireStore = useFirestore();
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

    fireStore
      .collection("games")
      .doc(gameID)
      .update({ heroes: hexas });
  };

  return (
    <Map
      size={{ x: 3, y: 3 }}
      flat={false}
      spacing={1.01}
      origin={{ x: 20, y: -30 }}
    >
      {heroes.map((hex, i) => (
        <Hexagon
          key={i}
          q={hex.q}
          r={hex.r}
          s={hex.s}
          fill={hex.image ? HexUtils.getID(hex) : null}
          data={hex}
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

export default TilesLayout;
