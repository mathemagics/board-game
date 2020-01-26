import * as React from "react";
import {ThemeProvider} from 'styled-components';
import {ApolloProvider} from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Page from 'component/base/Page';
import Character from 'component/page/Character';
import Home from 'component/page/Home';

import client from './apollo';
import theme from './theme';

import GlobalStyles from './GlobalStyles';

export default () => (
  <>
    <GlobalStyles />
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Page>
            <Switch>
              {/* TODO: Routes */}
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/character">
                <Character />
              </Route>
            </Switch>
          </Page>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </>
);
