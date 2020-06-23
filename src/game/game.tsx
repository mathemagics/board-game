import { createBoard } from "./board";
import { createDeck } from "./card";
import { createPlayer } from "./player";
import { createHeroBoard } from "./hero";

export const createGame = ({ userID }) => {
  const board = createBoard();
  const deck = createDeck();
  const heroes = createHeroBoard();
  const player = createPlayer(userID);
  return {
    board,
    deck,
    discard: [],
    heroes,
    players: { [userID]: player }
  };
};
