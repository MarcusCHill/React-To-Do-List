import React from 'react';
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";



function useSemiPersistentState() {

  /*
  Call and destructure React.useState hook to set todoList variable with value defined by setTodoList function.
  todoList is initialized as todoList stored in localStorage if falsly todoList is initialized as an empty array.
  */
  const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")) || []);

  /*
  React.useEffect provides a side effect to be ran based on dependancy.
  If a change occurs in TodoList this code is implemented which stores the TodoList in localStorage
  */
  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList])

  return [todoList, setTodoList]
};



/*
Create main function component App that returns a container holding all other function components and HTML JSX
returns heading title "Todo List", AddTodoForm component with onAddTodo handler, and TodoList component with todoList property
*/
function App() {

  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList")

  /*
  addTodo function accepts newTodo parameter and calls setTodoList setter function which accepts a new array with spreaded todoList items and newTodo item.
  */
  function addTodo (newTodo){
    setTodoList([...todoList, newTodo]);
  }

  return (
    <>
      <h1>Todo List</h1>
      {/*
      onAddTodo property of AddTodoForm component works as a callback handler function to define newTodo in addTodo function based on user input within AddTodoForm input feild.
      */}
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}/>
    </>
  );
};

export default App;
