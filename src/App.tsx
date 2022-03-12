import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from '@apollo/client';
import React, { useEffect } from 'react';
import './App.css';
import { ExchangeRates } from './ExchangeRates';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Apollo Client</h1>
        <ExchangeRates exchangeRates={EXCHANGE_RATES} />
      </div>
    </ApolloProvider>
  );
}

export default App;
