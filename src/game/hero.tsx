import {GridGenerator} from 'react-hexgrid';

export const heroes = [
  'Bird',
  'Cat',
  'Chimp',
  'Cow',
  'Dino',
  'Dog',
  'H 1',
  'H 2',
  'Hog',
  'Lion',
  'Panda',
  'Pig',
  'Polar'
];

export const createHeroBoard = () => {
  return GridGenerator.rectangle(3, 4).map((hexagon, index) => ({
    ...hexagon,
    text: heroes[index]
  }));
};
