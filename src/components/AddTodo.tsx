import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { GET_TODOS } from './LearnMutation';

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
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
    // refetchQueries: [GET_TODOS, 'get_todo'],//ただrefetchする時はこのオプション
    // 直接的にキャッシュの内容を変えたい時は以下のように
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>{`Submission error! ${error.message}`}</p>;

  console.log(data);
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
