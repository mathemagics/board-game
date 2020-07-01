import {createSelector} from 'reselect';

import {createPlayer} from 'game/player';
import {createGame} from 'game/game';
import {removeCard, drawCard, shuffle} from 'game/card';

// Actions
const SET_ACTIVE_GAME = 'SET_ACTIVE_GAME';

// Action Creators
export const setActiveGame = gameID => {
  return {type: SET_ACTIVE_GAME, payload: gameID};
};

// Reducer
export const gameReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_GAME:
      return {...state, activeGame: action.payload};
    default:
      return state;
  }
};

// Constants
// TODO: localize these enums
const PLAYER_ONE = 'player1';
const PLAYER_TWO = 'player2';

// Selectors

// TODO: rename activeGme activeGameID
// TODO: Handle storing activeGameID and activeGame in some normal way
export const selectActiveGameID = state => state.game.activeGame;

export const selectActiveGame = state => {
  const {
    game: {activeGame},
    firestore: {data},
  } = state;
  return activeGame && data.games && data.games[activeGame];
};

export const selectPlayer1 = createSelector(
  selectActiveGame,
  game => game.player1
);

export const selectPlayer2 = createSelector(
  selectActiveGame,
  game => game.player2
);

export const selectMyID = state => state.firebase.auth.uid;
export const selectMyName = state => state.firebase.auth.displayName;

export const selectActivePlayer = createSelector(
  selectActiveGame,
  game => game.activePlayer
);

export const selectMyPlayerKey = createSelector(
  [selectActiveGame, selectPlayer1, selectPlayer2, selectMyID],
  (game, player1, player2, myID) =>
    myID === player1.uid ? PLAYER_ONE : PLAYER_TWO
);

export const selectMyPlayer = createSelector(
  [selectActiveGame, selectMyPlayerKey],
  (game, myPlayerKey) => game[myPlayerKey]
);

export const selectEnemyPlayer = createSelector(
  [selectActiveGame, selectPlayer1, selectPlayer2, selectMyID],
  (game, player1, player2, myID) => {
    const enemyPlayerKey = myID === player1.uid ? PLAYER_TWO : PLAYER_ONE;
    return game[enemyPlayerKey];
  }
);

// SideEffects
export const createNewGame = () => {
  return (dispatch, getState, getFirebase) => {
    const {
      firebase: {
        auth: {uid, displayName},
      },
    } = getState();

    const newGame = createGame({userID: uid, name: displayName});

    return getFirebase()
      .firestore()
      .collection('games')
      .add(newGame)
      .then(game => {
        dispatch(setActiveGame(game.id));
      });
  };
};

export const updateGame = args => {
  return (dispatch, getState, getFirebase) => {
    const {activeGame} = getState().game;
    return getFirebase()
      .firestore()
      .collection('games')
      .doc(activeGame)
      .update(args);
  };
};

export const initializeBoard = () => {
  return (dispatch, getState) => {
    const {
      game: {activeGame},
      firestore: {data},
    } = getState();

    const {player1, player2, board} = data.games[activeGame];

    const player1Heroes = player1.heroes;
    const player2Heroes = player2.heroes;

    // TODO: need a much better implementation of this
    const newBoard = [...board];
    newBoard[51] = {...newBoard[51], text: player1Heroes[0]};
    newBoard[61] = {...newBoard[61], text: player1Heroes[1]};
    newBoard[70] = {...newBoard[70], text: player1Heroes[2]};
    newBoard[12] = {...newBoard[12], text: player2Heroes[0]};
    newBoard[20] = {...newBoard[20], text: player2Heroes[1]};
    newBoard[29] = {...newBoard[29], text: player2Heroes[2]};
    return dispatch(updateGame({board: newBoard}));
  };
};

export const addPlayer = () => {
  return (dispatch, getState) => {
    const state = getState();
    const uid = selectMyID(state);
    const displayName = selectMyName(state);
    const player1 = selectPlayer1(state);
    const player2 = selectPlayer2(state);

    if ((player1 && player1.uid === uid) || (player2 && player2.uid === uid)) {
      return;
    }

    const playerKey = player1 ? PLAYER_TWO : PLAYER_ONE;
    const newPlayer = createPlayer({userID: uid, name: displayName});

    return dispatch(updateGame({[playerKey]: newPlayer}));
  };
};

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
  const {hand} = selectMyPlayer(state);
  // TODO put the playerKey on the player
  const myPlayerKey = selectMyPlayerKey(state);
  const remainingHand = removeCard(card, hand);

  if (banned) {
    dispatch(
      updateGame({
        banned: card,
        [`${myPlayerKey}.hand`]: [...remainingHand, banned],
      })
    );
  } else {
    const isDeckEmpty = deck.length === 0;
    const drawDeck = isDeckEmpty ? shuffle([...discard]) : deck;
    const [replacementCard, remainingDeck] = drawCard(drawDeck);

    dispatch(
      updateGame({
        banned: card,
        [`${myPlayerKey}.hand`]: [...remainingHand, replacementCard],
        deck: remainingDeck,
        discard: isDeckEmpty ? [] : discard,
      })
    );
  }
};

export const cycleFromHand = card => (dispatch, getState) => {
  const state = getState();
  const {deck, discard} = selectActiveGame(state);
  const {hand} = selectMyPlayer(state);
  const myPlayerKey = selectMyPlayerKey(state);

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
      [`${myPlayerKey}.hand`]: newHand,
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
  const {hand} = selectMyPlayer(state);
  const myPlayerKey = selectMyPlayerKey(state);
  const [discardedHand, newDiscard] = discardCard({card, hand, discard});

  dispatch(
    updateGame({
      discard: newDiscard,
      [`${myPlayerKey}.hand`]: discardedHand,
    })
  );
};

export const drawFromDeck = () => (dispatch, getState) => {
  const state = getState();
  const {deck, discard} = selectActiveGame(state);
  const {hand} = selectMyPlayer(state);
  const myPlayerKey = selectMyPlayerKey(state);

  // TODO better handle empty deck across action
  const isDeckEmpty = deck.length === 0;
  const drawDeck = isDeckEmpty ? shuffle([...discard]) : deck;

  const [card, newDeck] = drawCard(drawDeck);
  const newHand = [...hand, card];

  dispatch(
    updateGame({
      discard: isDeckEmpty ? [] : discard,
      deck: newDeck,
      [`${myPlayerKey}.hand`]: newHand,
    })
  );
};

export const drawFromDiscard = () => (dispatch, getState) => {
  const state = getState();
  const myPlayerKey = selectMyPlayerKey(state);
  const myPlayer = selectMyPlayer(state);
  const {discard} = selectActiveGame(state);

  if (discard.length < 1) {
    return;
  }

  const newHand = [...myPlayer.hand, discard[discard.length - 1]];
  const newDiscard = discard.slice(0, discard.length - 1);

  return dispatch(
    updateGame({[`${myPlayerKey}.hand`]: newHand, discard: newDiscard})
  );
};

export const swapHandAndPool = ({handCard, poolCard}) => (
  dispatch,
  getState
) => {
  const state = getState();
  const {pool} = selectActiveGame(state);
  const {hand} = selectMyPlayer(state);
  const myPlayerKey = selectMyPlayerKey(state);

  const poolIndex = pool.indexOf(poolCard);
  const newPool = [...pool];
  newPool[poolIndex] = handCard;

  const handIndex = hand.indexOf(handCard);
  const newHand = [...hand];
  newHand[handIndex] = poolCard;

  dispatch(
    updateGame({
      [`${myPlayerKey}.hand`]: newHand,
      pool: newPool,
    })
  );
};
