import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
  getFirebase,
  FirebaseReducer,
  FirestoreReducer,
} from 'react-redux-firebase';

import {rootReducer} from './reducer';

const middlewares = [thunk.withExtraArgument(getFirebase)];

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

interface LocalState {
  gameId: string;
  game: {activeGame: string};
}

export interface RootState {
  firebase: FirebaseReducer.Reducer<LocalState>;
  firestore: FirestoreReducer.Reducer;
  // TODO create game type
  game: {activeGame: string};
}

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);
