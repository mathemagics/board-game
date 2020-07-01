export const HEART = 'heart';
export const SPADE = 'spade';
export const DIAMOND = 'diamond';
export const CLUB = 'club';
export const FACE = 'face';

const COUNT = 10;

const suits = [HEART, SPADE, DIAMOND, CLUB, FACE];

export const newDeck = () => {
  return suits.reduce((acc, suit) => {
    for (let i = 0; i < COUNT; i += 1) {
      acc.push(suit);
    }
    return acc;
  }, []);
};

export const shuffle = array => {
  const count = array.length - 1;
  for (let i = count; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const createDeck = () => {
  const deck = shuffle(newDeck());
  const pool = [deck[0], deck[1], deck[2]];
  const restDeck = deck.slice(3, deck.length);
  return [restDeck, pool];
};

export const drawCard = deck => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck[randomIndex];
  const remainingDeck = deck.filter((_item, index) => {
    return randomIndex !== index;
  });
  return [card, remainingDeck];
};

export const discardCard = ({card, hand, discard}) => {
  const newHand = [...hand];
  const index = newHand.indexOf(card);
  if (index > -1) {
    newHand.splice(index, 1);
  }
  const newDiscard = [...discard, card];
  return [newHand, newDiscard];
};

export const removeCard = (card, pile) =>
  pile.filter((_card, index) => pile.indexOf(card) !== index);
