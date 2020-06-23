export const HEART = "heart";
export const SPADE = "spade";
export const DIAMOND = "diamond";
export const CLUB = "club";
export const FACE = "face";

const COUNT = 10;

const suits = [HEART, SPADE, DIAMOND, CLUB, FACE];

export const createDeck = () => {
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

export const newDeck = () => shuffle(createDeck());

export const drawCard = deck => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck[randomIndex];
  const remainingDeck = deck.filter((_item, index) => {
    return randomIndex !== index;
  });
  return [card, remainingDeck];
};
