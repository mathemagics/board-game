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

// side effects, only as applicable
// e.g. thunks, epics, etc
export function getWidget() {
  return dispatch =>
    get('/widget').then(widget => dispatch(updateWidget(widget)));
}
