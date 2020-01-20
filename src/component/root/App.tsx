import * as React from "react";
import {ApolloProvider} from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Character from 'component/page/Character';
import Home from 'component/page/Home';


import client from './apollo';

export default () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/character">
          <Character />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);
