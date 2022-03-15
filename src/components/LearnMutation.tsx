import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';

const GET_TODOS = gql`
  {
    todos {
      id
      type
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

export const LearnMutation = () => {
  const [inputText, setInputText] = useState('');
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h1>Learn mutation</h1>
      {data.todos.map((id: string, type: string) => (
        <div key={id}>
          <p>{type}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTodo({ variables: { id, type: inputText } });
              setInputText('');
            }}
          >
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit">Update todo</button>
          </form>
          {mutationLoading && <p>Loading...</p>}
          {mutationError && <p>Error :( Please try again</p>}
        </div>
      ))}
    </div>
  );
};
