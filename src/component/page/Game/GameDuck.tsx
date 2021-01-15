import {createSelector} from 'reselect';
import {createPlayer} from 'game/player';
import {createGame, Game} from 'game/game';
import {heroes as heroPool, Hero} from 'game/hero';

import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'component/root/createStore';
// Actions
const SET_ACTIVE_GAME = 'SET_ACTIVE_GAME';
const SET_INSPECT_HERO = 'SET_INSPECT_HERO';

type SetActiveGameType = {
  type: typeof SET_ACTIVE_GAME;
  payload: string;
};

type SetInspectHeroType = {
  type: typeof SET_INSPECT_HERO;
  payload: string;
};

type GameActionType = SetActiveGameType | SetInspectHeroType | {type: ''};

// Action Creators
export const setActiveGame = (gameID: string) => {
  return {type: SET_ACTIVE_GAME, payload: gameID};
};

export const setInspectHero = (hero: string) => {
  return {type: SET_INSPECT_HERO, payload: hero};
};

// Reducer
export const gameReducer = (
  state = {},
  action: GameActionType = {type: ''}
) => {
  switch (action.type) {
    case SET_ACTIVE_GAME:
      return {...state, activeGame: action.payload};
    case SET_INSPECT_HERO:
      return {...state, inspectHero: action.payload};
    default:
      return state;
  }
};

// Constants
// TODO: localize these enums
const PLAYER_ONE = 'player1';
const PLAYER_TWO = 'player2';

// Selectors

// TODO: rename activeGame activeGameID
// TODO: Handle storing activeGameID and activeGame in some normal way
export const selectActiveGameID = (state: RootState) => state.game.activeGame;

export const selectActiveGame = (state: RootState) => {
  const {
    game: {activeGame},
    firestore: {data},
  } = state;
  return activeGame && data.games && data.games[activeGame];
};

export const selectInspectHero = (state: RootState) =>
  heroPool.filter(hero => hero.name === state.game.inspectHero)[0];

export const selectPlayer1 = createSelector(
  selectActiveGame,
  game => game.player1
);

export const selectPlayer2 = createSelector(
  selectActiveGame,
  game => game.player2
);

export const selectMyID = (state: RootState) => state.firebase.auth.uid;
export const selectMyName = (state: RootState) =>
  state.firebase.auth.displayName;

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
  [selectActiveGame, selectPlayer1, selectPlayer2, selectMyID],
  (game, player1, player2, myID) => {
    const key =
      player1.uid === myID
        ? PLAYER_ONE
        : player2.uid === myID
        ? PLAYER_TWO
        : null;
    return game[key];
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
export const createNewGame = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action
> => {
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
      .then((game: Game) => {
        dispatch(setActiveGame(game.id));
      });
  };
};

export const updateGame = (
  args
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch, getState, getFirebase) => {
    const {activeGame} = getState().game;
    return getFirebase()
      .firestore()
      .collection('games')
      .doc(activeGame)
      .update(args);
  };
};

export const initializeBoard = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action
> => {
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
    newBoard[51] = {...newBoard[51], text: player1Heroes[0].name};
    newBoard[61] = {...newBoard[61], text: player1Heroes[1].name};
    newBoard[70] = {...newBoard[70], text: player1Heroes[2].name};
    newBoard[12] = {...newBoard[12], text: player2Heroes[0].name};
    newBoard[20] = {...newBoard[20], text: player2Heroes[1].name};
    newBoard[29] = {...newBoard[29], text: player2Heroes[2].name};

    newBoard[19] = {...newBoard[19], text: 'D1'};
    newBoard[38] = {...newBoard[38], text: 'D2'};

    newBoard[52] = {...newBoard[52], text: 'R1'};
    newBoard[71] = {...newBoard[71], text: 'R2'};

    return dispatch(updateGame({board: newBoard}));
  };
};

export const addPlayer = (): ThunkAction<void, RootState, unknown, Action> => {
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

    dispatch(
      updateGame({
        [playerKey]: {...newPlayer, key: playerKey},
      })
    );
  };
};

export const chooseHero = (
  chosenHero: Hero
): ThunkAction<void, RootState, unknown, Action> => (dispatch, getState) => {
  const state = getState();
  const {heroes, activePlayer} = selectActiveGame(state);
  const {heroes: myHeroes, key} = selectMyPlayer(state);

  if (activePlayer === key) {
    const nextPlayer = activePlayer === 'player1' ? 'player2' : 'player1';

    dispatch(
      updateGame({
        heroes: heroes.filter(hero => hero.name !== chosenHero.name),
        [`${key}.heroes`]: [...myHeroes, chosenHero],
        activePlayer: nextPlayer,
      })
    );
  }
};

export const updateHitPoints = (
  hero: Hero,
  hp: number
): ThunkAction<void, RootState, unknown, Action> => (dispatch, getState) => {
  const state = getState();
  const {heroes, key} = selectMyPlayer(state);
  const heroIndex = heroes.findIndex(aHero => aHero.name === hero.name);
  if (heroIndex >= 0) {
    const myHeroes = [...heroes];
    const myHero = myHeroes[heroIndex];
    myHeroes[heroIndex] = {...myHero, hp};
    dispatch(
      updateGame({
        [`${key}.heroes`]: myHeroes,
      })
    );
  }
};
