import {createBoard} from './board';
import {createDeck} from './card';
import {createPlayer} from './player';
import {createHeroBoard} from './hero';
import {createObjectBoard} from './object';

const PLAYER_ONE = 'player1';
const PLAYER_TWO = 'player2';

// TODO this is a terrible enum
export const GAME_PHASES = {
  character: 'CHARACTER',
  game: 'GAME',
};

export const createGame = ({userID, name}) => {
  const board = createBoard();
  const [deck, pool] = createDeck();
  const heroes = createHeroBoard();
  const objects = createObjectBoard();
  const player = createPlayer({userID, name});

  const isPlayer1 = Math.floor(Math.random() * 2) === 0;
  const playerKey = isPlayer1 ? PLAYER_ONE : PLAYER_TWO;

  return {
    activePlayer: PLAYER_ONE,
    board,
    deck,
    discard: [],
    heroes,
    objects,
    phase: GAME_PHASES.character,
    [playerKey]: {...player, key: playerKey},
    pool,
  };
};

// TODO Something with all this shit.
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
  // This is wrong
  players: [Player];
  pool: [Card];
  phase: 'character' | 'game';
  activePlayer: string;
}
