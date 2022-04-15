import React from 'react';
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
/*
Create main function component App that returns a container holding all other function components and HTML JSX
returns heading title "Todo List", AddTodoForm component with onAddTodo handler, paragraph displaying user input, and TodoList component
*/
function App() {
  /*
  Call and destructure React.useState hook to load paragraph value defined as newTodo and update value through setNewTodo function
  */
  const [todoList, setTodoList] = React.useState([]);

  function addTodo (newTodo){
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      {/*
      onAddTodo property of AddTodoForm component works as a callback handler function to define setNewTodo value based on user input within AddTodoForm input feild.
      */}
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}/>
    </div>
  );
};

export default App;
