import {removeCard, drawCard, shuffle, discardCard} from 'game/card';

import {selectActiveGame, selectMyPlayer, updateGame} from './GameDuck';

// TODO maybe dedupe with banFromHand
export const banFromPool = card => (dispatch, getState) => {
  const game = selectActiveGame(getState());
  const {banned, deck, discard, pool} = game;
  const remainingPool = removeCard(card, pool);

  if (banned) {
    dispatch(
      updateGame({
        banned: card,
        pool: [...remainingPool, banned],
      })
    );
  } else {
    const isDeckEmpty = deck.length === 0;
    const drawDeck = isDeckEmpty ? shuffle([...discard]) : deck;
    const [replacementCard, remainingDeck] = drawCard(drawDeck);

    dispatch(
      updateGame({
        banned: card,
        pool: [...remainingPool, replacementCard],
        deck: remainingDeck,
        discard: isDeckEmpty ? [] : discard,
      })
    );
  }
};

export const banFromHand = card => (dispatch, getState) => {
  const state = getState();
  const {banned, deck, discard} = selectActiveGame(state);
  const {hand, key} = selectMyPlayer(state);
  const remainingHand = removeCard(card, hand);

  if (banned) {
    dispatch(
      updateGame({
        banned: card,
        [`${key}.hand`]: [...remainingHand, banned],
      })
    );
  } else {
    const isDeckEmpty = deck.length === 0;
    const drawDeck = isDeckEmpty ? shuffle([...discard]) : deck;
    const [replacementCard, remainingDeck] = drawCard(drawDeck);

    dispatch(
      updateGame({
        banned: card,
        [`${key}.hand`]: [...remainingHand, replacementCard],
        deck: remainingDeck,
        discard: isDeckEmpty ? [] : discard,
      })
    );
  }
};

export const cycleFromHand = card => (dispatch, getState) => {
  const state = getState();
  const {deck, discard} = selectActiveGame(state);
  const {hand, key} = selectMyPlayer(state);

  const isDeckEmpty = deck.length === 0;
  const drawDeck = isDeckEmpty ? shuffle([...discard]) : deck;
  const newDiscard = isDeckEmpty ? [card] : [...discard, card];
  const [newCard, newDeck] = drawCard(drawDeck);

  const remainingHand = removeCard(card, hand);
  const newHand = [...remainingHand, newCard];

  dispatch(
    updateGame({
      discard: newDiscard,
      deck: newDeck,
      [`${key}.hand`]: newHand,
    })
  );
};

export const cycleFromPool = card => (dispatch, getState) => {
  const {pool, deck, discard} = selectActiveGame(getState());

  const isDeckEmpty = deck.length === 0;
  const activeDeck = isDeckEmpty ? shuffle([...discard]) : deck;
  const newDiscard = isDeckEmpty ? [card] : [...discard, card];

  const index = pool.indexOf(card);
  const [newCard, newDeck] = drawCard(activeDeck);
  const newPool = [...pool];
  newPool[index] = newCard;

  dispatch(
    updateGame({
      deck: newDeck,
      discard: newDiscard,
      pool: newPool,
    })
  );
};

export const discardFromHand = card => (dispatch, getState) => {
  const state = getState();
  const {discard} = selectActiveGame(state);
  const {hand, key} = selectMyPlayer(state);
  const [discardedHand, newDiscard] = discardCard({card, hand, discard});

  dispatch(
    updateGame({
      discard: newDiscard,
      [`${key}.hand`]: discardedHand,
    })
  );
};

export const drawFromDeck = () => (dispatch, getState) => {
  const state = getState();
  const {deck, discard} = selectActiveGame(state);
  const {hand, key} = selectMyPlayer(state);

  // TODO better handle empty deck across action
  const isDeckEmpty = deck.length === 0;
  const drawDeck = isDeckEmpty ? shuffle([...discard]) : deck;

  const [card, newDeck] = drawCard(drawDeck);
  const newHand = [...hand, card];

  dispatch(
    updateGame({
      discard: isDeckEmpty ? [] : discard,
      deck: newDeck,
      [`${key}.hand`]: newHand,
    })
  );
};

export const drawFromDiscard = () => (dispatch, getState) => {
  const state = getState();
  const {hand, key} = selectMyPlayer(state);
  const {discard} = selectActiveGame(state);

  if (discard.length < 1) {
    return;
  }

  const newHand = [...hand, discard[discard.length - 1]];
  const newDiscard = discard.slice(0, discard.length - 1);

  return dispatch(updateGame({[`${key}.hand`]: newHand, discard: newDiscard}));
};

export const swapHandAndPool = ({handCard, poolCard}) => (
  dispatch,
  getState
) => {
  const state = getState();
  const {pool} = selectActiveGame(state);
  const {hand, key} = selectMyPlayer(state);

  const poolIndex = pool.indexOf(poolCard);
  const newPool = [...pool];
  newPool[poolIndex] = handCard;

  const handIndex = hand.indexOf(handCard);
  const newHand = [...hand];
  newHand[handIndex] = poolCard;

  dispatch(
    updateGame({
      [`${key}.hand`]: newHand,
      pool: newPool,
    })
  );
};
