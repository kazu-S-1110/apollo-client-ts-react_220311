import { gql, NetworkStatus, useQuery } from '@apollo/client';
import React, { ReactNode, VFC } from 'react';
import { JsxElement } from 'typescript';

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

export const GetRepositories: VFC = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_REPOSITORIES,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  console.log(data);

  if (networkStatus === NetworkStatus.refetch) return <p>Refetching!</p>;

  if (loading) return <p>'Loading...'</p>;

  return (
    <>
      {loading && 'loading...'}
      {error && `Error! ${error.message}`}
      {data?.user.repositories.nodes.map((repository: any) => (
        <p key={repository.url}>{repository.name}</p>
      ))}
      <button onClick={() => refetch()}>Refetch!</button>
    </>
  );
};
