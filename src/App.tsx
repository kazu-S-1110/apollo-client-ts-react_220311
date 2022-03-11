import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import React, { useEffect } from 'react';
import './App.css';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});
const GET_RATES = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
    }
  }
`;

function App() {
  useEffect(() => {
    client.query({ query: GET_RATES }).then((result) => console.log(result));
  }, []);
  return (
    <div>
      <h1>Apollo Client</h1>
    </div>
  );
}

export default App;
