import {createBoard} from './board';
import {createDeck, Card} from './card';
import {createPlayer, Player} from './player';
import {heroes, Hero} from './hero';
import {createObjectBoard} from './object';

const PLAYER_ONE = 'player1';
const PLAYER_TWO = 'player2';

// TODO this is a terrible enum
export const GAME_PHASES = {
  character: 'CHARACTER',
  game: 'GAME',
} as const;

export const createGame = ({userID, name}: {userID: string, name: string}): Game => {
  const board = createBoard();
  const [deck, pool] = createDeck();
  const objects = createObjectBoard();
  const player = createPlayer({userID, name});

  const isPlayer1 = Math.floor(Math.random() * 2) === 0;
  const playerKey = isPlayer1 ? PLAYER_ONE : PLAYER_TWO;

  return {
    id: '',
    players: [],
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

type Objects = string;

export interface Game {
  id: string;
  board: [];
  deck: Card[];
  discard: Card[];
  objects: Object[];
  heroes: Hero[],
  players: Player[];
  pool: Card[];
  phase: typeof GAME_PHASES[keyof typeof GAME_PHASES];
  activePlayer: string;
}
