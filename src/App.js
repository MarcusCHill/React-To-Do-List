import React from 'react';
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
/*
Create main function component App that returns a container holding all other function components and HTML JSX
returns heading title "Todo List", AddTodoForm component with onAddTodo handler, and TodoList component with todoList property
*/
function App() {
  /*
  Call and destructure React.useState hook to set todoList variable with value defined by setTodoList function.
  todoList is initialized as empty array
  */
  const [todoList, setTodoList] = React.useState([]);
  /*
  addTodo function accepts newTodo parameter and calls setTodoList setter function which accepts a new array with spreaded todoList items and newTodo item.
  */
  function addTodo (newTodo){
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      {/*
      onAddTodo property of AddTodoForm component works as a callback handler function to define newTodo in addTodo function based on user input within AddTodoForm input feild.
      */}
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}/>
    </div>
  );
};

export default App;
