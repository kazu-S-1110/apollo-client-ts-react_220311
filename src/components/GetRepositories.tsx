import { gql, useQuery } from '@apollo/client';
import React, { VFC } from 'react';

const GET_REPOSITORIES = gql`
  query {
    user(login: "kazu-S-1110") {
      name
      url
      repositories(last: 20) {
        totalCount
        nodes {
          name
          description
          createdAt
          updatedAt
          url
        }
      }
    }
  }
`;

export const GetRepositories: VFC = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);

  console.log(data);

  return (
    <>
      {loading && <p>'Loading...'</p>}
      {error && `Error! ${error.message}`}
      {data?.user.repositories.nodes.map((repository: any) => (
        <p key={repository.url}>{repository.name}</p>
      ))}
    </>
  );
};
