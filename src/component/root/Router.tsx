import * as React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {isLoaded, isEmpty} from 'react-redux-firebase';

import {Auth} from 'component/page/Auth';
import {Home} from 'component/page/Home';
import {NewGame} from 'component/page/Game';

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

export const PageRouter = ({props}) => (
  <Router {...props}>
    <Switch>
      <Route exact path="/">
        <Auth />
      </Route>
      <PrivateRoute exact path="/home">
        <Home />
      </PrivateRoute>
      <PrivateRoute path="/game">
        <NewGame />
      </PrivateRoute>
    </Switch>
  </Router>
);
