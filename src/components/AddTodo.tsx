import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

export const AddTodo = () => {
  const [input, setInput] = useState('');
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>{`Submission error! ${error.message}`}</p>;

  return (
    <div>
      <h1>AddTodo</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo({ variables: { type: input } });
            setInput('');
          }}
        >
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </div>
  );
};
