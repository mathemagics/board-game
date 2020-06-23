import * as React from "react";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import firebase from "firebase/app";
import { createStore, combineReducers } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

import Page from "component/base/Page";
import Auth from "component/page/Auth";
import Home from "component/page/Home";
import Game from "component/page/Game";
import NewGame from "component/page/Game/New";

import theme from "./theme";
import GlobalStyles from "./GlobalStyles";

import "firebase/auth";
import "firebase/firestore";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

firebase.initializeApp(fbConfig);
firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector(state => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default () => (
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
                <PrivateRoute path="/game/new">
                  <NewGame />
                </PrivateRoute>
                <PrivateRoute path="/game/:gameID">
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
