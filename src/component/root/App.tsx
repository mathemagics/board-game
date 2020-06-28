import * as React from 'react';
import {Provider} from 'react-redux';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';
import {ThemeProvider} from 'styled-components';
import firebase from 'firebase/app';

import {theme} from './theme';
import {GlobalStyles} from './GlobalStyles';
import {store} from './createStore';

import {PageRouter} from './Router';

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

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export const App = () => (
  <>
    <GlobalStyles />
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <PageRouter />
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  </>
);
