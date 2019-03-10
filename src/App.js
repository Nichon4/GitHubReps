import React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import {Reps} from "./components/Reps"
import './App.css'

const token = "";

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat( new HttpLink({ uri: 'https://api.github.com/graphql'})),
  cache: new InMemoryCache()
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Reps/>

        </div>
      </ApolloProvider>
    );
  }
}

export default App;
