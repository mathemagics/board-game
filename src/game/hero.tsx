import {GridGenerator} from 'react-hexgrid';

export const heroes = [
  'Bird',
  'Bristle',
  'Cat',
  'Cow',
  'Dino',
  'Dog',
  'Frog',
  'H 1',
  'H 2',
  'Hamster',
  'Hog',
  'Kang',
  'Lion',
  'Monkey',
  'Panda',
  'Pig',
].sort();

export const createHeroBoard = () => {
  return GridGenerator.rectangle(4, 4).map((hexagon, index) => ({
    ...hexagon,
    text: heroes[index],
  }));
};
