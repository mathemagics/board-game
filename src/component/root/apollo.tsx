import {ApolloClient} from 'apollo-client';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';

const cache = new InMemoryCache();
// TODO Environment variable to determine this
const link = new HttpLink({
  uri: 'https://the-woodland.herokuapp.com/api',
  fetchOptions: {
    mode: 'cors',
  },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
});

export default client;
