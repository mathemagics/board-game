import * as React from "react";
import {ThemeProvider} from 'styled-components';
import {ApolloProvider} from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Character from 'component/page/Character';
import Home from 'component/page/Home';

import client from './apollo';
import theme from './theme';

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {/* TODO: Routes */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/character">
            <Character />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
);
