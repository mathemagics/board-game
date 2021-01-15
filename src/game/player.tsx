import {Card} from './card';
import {Hero} from './hero';

export interface Player {
  uid: string;
  name: string;
  hand: Card[];
  reaction: Card[];
  heroes: Hero[];
}

export const createPlayer = ({
  userID,
  name,
}: {
  userID: string;
  name: string;
}): Player => ({
  uid: userID,
  name,
  hand: [],
  reaction: [],
  heroes: [],
});
