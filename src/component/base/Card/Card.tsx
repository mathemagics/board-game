import * as React from "react";
import {
  GiHeartBeats,
  GiCutDiamond,
  GiSpadeSkull,
  GiClubs,
  GiCrownedSkull
} from "react-icons/gi";

import { Container } from "./Card.style";

export default ({ suit }) => {
  let Icon;
  let color;
  switch (suit) {
    case "diamond":
      Icon = GiCutDiamond;
      color = "blue";
      break;

    case "heart":
      Icon = GiHeartBeats;
      color = "red";
      break;

    case "spade":
      Icon = GiSpadeSkull;
      color = "black";
      break;

    case "face":
      Icon = GiCrownedSkull;
      color = "orange";
      break;

    case "club":
      Icon = GiClubs;
      color = "green";
      break;

    default:
      break;
  }
  return (
    <Container>
      <Icon color={color} />
    </Container>
  );
};
