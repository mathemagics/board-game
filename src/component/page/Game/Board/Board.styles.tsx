import styled from "styled-components";
import { Layout, Hexagon } from "react-hexgrid";

const DEFAULT_COLOR = "#15788c";
const STARTING_COLOR = "#59ACC2";
const DRAW_COLOR = "#25B49A";

export const Hex = styled(Hexagon)`
  background: white;
  fill: ${({ starting, drawing }) =>
    starting ? STARTING_COLOR : drawing ? DRAW_COLOR : DEFAULT_COLOR};
`;

export const Map = styled(Layout)`
  background: white;

  g {
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
