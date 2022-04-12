import React from 'react';
import './style.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

const GET_STARWARS_FILMS = gql`
  query GetFilms {
    allFilms {
      films {
        id
        episodeID
        title
      }
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

function DisplayFilms() {
  const { loading, error, data } = useQuery(GET_STARWARS_FILMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allFilms.films.map(({ id, title, episodeID }) => (
    <div key={id}>
      <p>
        {episodeID}: {title}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div>
      <h1>Star Wars Films</h1>
      <DisplayFilms />
    </div>
  );
}

function WrappedAppProd() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default WrappedAppProd;
