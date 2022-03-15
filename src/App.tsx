import './App.css';
import { AddTodo } from './components/AddTodo';
import { GetRepositories } from './components/GetRepositories';
import { LearnMutation } from './components/LearnMutation';

function App() {
  return (
    <>
      {/* <GetRepositories /> */}
      <LearnMutation />
      <AddTodo />
    </>
  );
}

export default App;
