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

  /*
  removeTodo function accepts id parameter
  current todoList is then filtered to return a new todoList named listAfterRemovedItem that does not contain the list item with the id argument
  calls setTodoList setter function which accepts an array with spreaded listAfterRemovedItem items
  */
  function removeTodo (id){
    const listAfterRemovedItem = todoList.filter((item) => item.id !== id)
    return(
      setTodoList([...listAfterRemovedItem])
    );
  };

  return (
    <>
      <h1>Todo List</h1>
      {/*
      onAddTodo property of AddTodoForm component works as a callback handler to define newTodo in addTodo function based on user input within AddTodoForm input feild.
      */}
      <AddTodoForm onAddTodo={addTodo}/>
      {/*
      onRemoveTodo property of TodoList component works as a callback handler to pass id argument in removeTodo function based on a pre-defined TodoListItem's id.
      Property passed down to TodoList.js and once more to TodoListItem.js
      */}
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
    </>
  );
};

export default App;
