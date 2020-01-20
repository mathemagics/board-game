import * as React from "react";
import {ApolloProvider} from '@apollo/react-hooks';

import client from './apollo';

export default () => (
  <ApolloProvider client={client}>
    <div>Yellllllow</div>
  </ApolloProvider>
);
