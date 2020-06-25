import {createBoard} from './board';
import {createDeck} from './card';
import {createPlayer} from './player';
import {createHeroBoard} from './hero';
import {createObjectBoard} from './object';

export const createGame = ({userID}) => {
  const board = createBoard();
  const [deck, pool] = createDeck();
  const heroes = createHeroBoard();
  const objects = createObjectBoard();
  const player = createPlayer(userID);
  return {
    board,
    deck,
    discard: [],
    heroes,
    objects,
    players: {[userID]: player},
    pool,
  };
};
