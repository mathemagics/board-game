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
    activePlayer: userID,
    board,
    deck,
    discard: [],
    heroes,
    objects,
    players: {[userID]: player},
    pool,
  };
};

type Card = string;
type Hero = string;
type Objects = string;
type Player = {
  hand: [Card];
  heroes: [Hero];
};

interface Game {
  board: [];
  deck: [Card];
  discard: [Card];
  objects: [Objects];
  players: [Player];
  pool: [Card];
  phase: 'character' | 'game';
  activePlayer: string;
}
