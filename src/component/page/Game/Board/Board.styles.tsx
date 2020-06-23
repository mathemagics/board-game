import styled from "styled-components";
import { Layout, Hexagon } from "react-hexgrid";

export const Hex = styled(Hexagon)`
  background: white;
`;

export const Map = styled(Layout)`
  background: white;

  g {
    fill: ${({ blocked }) => (blocked ? "#465880" : "#4499a9")};

    fill-opacity: 0.6;
  }

  g text {
    font-size: 0.18em;
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

  g:hover {
    fill: #6eccdd;
    fill-opacity: 0.7;
  }

  g:hover text {
    fill-opacity: 1;
  }
`;
