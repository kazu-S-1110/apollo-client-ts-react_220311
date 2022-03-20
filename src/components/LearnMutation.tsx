import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';

export const GET_TODOS = gql`
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

type Todo_type = {
  id: string;
  type: string;
};

export const LearnMutation = () => {
  const [inputText, setInputText] = useState('');
  const { loading, error, data, refetch } = useQuery(GET_TODOS, {
    errorPolicy: 'all',
  });
  const [updateTodo, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data);
  return (
    <div>
      <h1>Learn mutation</h1>
      {data.todos.map((todo: Todo_type) => (
        <div key={todo.id}>
          <p>{todo.type}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTodo({ variables: { type: inputText } });
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
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
};
