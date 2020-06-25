import {GridGenerator} from 'react-hexgrid';

export const objects = ['Rock'];

export const createObjectBoard = () => {
  return GridGenerator.rectangle(1, 1).map((hexagon, index) => ({
    ...hexagon,
    text: objects[index]
  }));
};
