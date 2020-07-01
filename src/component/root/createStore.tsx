import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {getFirebase} from 'react-redux-firebase';

import {rootReducer} from './reducer';

const middlewares = [thunk.withExtraArgument(getFirebase)];

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);
