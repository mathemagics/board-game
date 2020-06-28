import {GridGenerator} from 'react-hexgrid';

export const heroes = [
  'Bird',
  'Cat',
  'Cow',
  'Chimp',
  'Dino',
  'Dog',
  'Frog',
  'H 1',
  'H 2',
  'Hog',
  'Kang',
  'Lion',
  'Mouse',
  'Panda',
  'Pig',
  'Tort',
].sort();

export const createHeroBoard = () => {
  return GridGenerator.rectangle(4, 4).map((hexagon, index) => ({
    ...hexagon,
    text: heroes[index],
  }));
};
