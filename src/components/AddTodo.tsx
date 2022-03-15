import { gql, useMutation } from '@apollo/client';
import React from 'react';

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;

type inputType = {
  value: string;
};

export const AddTodo = () => {
  let input: inputType;
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
            addTodo({ variables: { text: input.value } });
            input.value = '';
          }}
        >
          <input />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </div>
  );
};
