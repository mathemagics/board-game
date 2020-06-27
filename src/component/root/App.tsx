import * as React from 'react';
import {Provider, useSelector} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createStore, combineReducers} from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';
import {createFirestoreInstance, firestoreReducer} from 'redux-firestore'; // <- needed if using firestore
import {ThemeProvider} from 'styled-components';
import firebase from 'firebase/app';

import {Page} from 'component/base/Page';
import {Auth} from 'component/page/Auth';
import {Home} from 'component/page/Home';
import {Game} from 'component/page/Game';

import {theme} from './theme';
import {GlobalStyles} from './GlobalStyles';

import 'firebase/auth';
import 'firebase/firestore';

import {fbConfig} from '../../../secret';

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

firebase.initializeApp(fbConfig);
firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const PrivateRoute = ({children, ...rest}) => {
  const auth = useSelector(state => state.firebase.auth);
  if (isLoaded(auth) && isEmpty(auth)) {
    firebase.login({provider: 'google', type: 'popup'});
  }
  return (
    <Route
      {...rest}
      render={() =>
        isLoaded(auth) && !isEmpty(auth) ? children : <div>Logging In...</div>
      }
    />
  );
};

export const App = () => (
  <>
    <GlobalStyles />
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <Router>
            <Page>
              <Switch>
                <Route exact path="/">
                  <Auth />
                </Route>
                <PrivateRoute exact path="/home">
                  <Home />
                </PrivateRoute>
                <PrivateRoute path="/game">
                  <Game />
                </PrivateRoute>
              </Switch>
            </Page>
          </Router>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  </>
);
