import { gql, NetworkStatus, useLazyQuery, useQuery } from '@apollo/client';
import { useState, VFC } from 'react';

const GET_REPOSITORIES = gql`
  query GetRepositories($num: Int) {
    user(login: "kazu-S-1110") {
      name
      url
      repositories(last: $num) {
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
  const [getNum, setGetNum] = useState<string | number>(0);
  const [getRepos, { loading, error, data, refetch, networkStatus }] =
    useLazyQuery(GET_REPOSITORIES, {
      variables: {
        num: getNum,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    });

  if (networkStatus === NetworkStatus.refetch) return <p>Refetching!</p>;
  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>{`Error! :${error.message}`}</p>;

  return (
    <>
      <input
        type="number"
        value={getNum}
        onChange={(e) => setGetNum(e.target.value)}
      />
      <button onClick={() => getRepos({ variables: { num: Number(getNum) } })}>
        Fetch data
      </button>
      <button onClick={() => refetch()}>Refetch!</button>

      {data?.user.repositories.nodes.map((repository: any) => (
        <p key={repository.url}>{repository.name}</p>
      ))}
    </>
  );
};
