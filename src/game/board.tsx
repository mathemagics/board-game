import {GridGenerator} from 'react-hexgrid';

export const createBoard = () =>
  GridGenerator.hexagon(5).map(hex => ({...hex}));
