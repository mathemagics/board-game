import {createSelector} from 'reselect';

import {createPlayer} from 'game/player';
import {createGame} from 'game/game';

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

export const selectMyPlayer = createSelector(
  [selectActiveGame, selectPlayer1, selectPlayer2, selectMyID],
  (game, player1, player2, myID) => {
    const myPlayer = myID === player1.uid ? PLAYER_ONE : PLAYER_TWO;
    return game[myPlayer];
  }
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
