import {combineReducers} from 'redux';

import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';

import {gameReducer} from 'component/page/Game/GameDuck';

export const rootReducer = combineReducers({
  game: gameReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
