import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

/*
Create main function component App that returns a container holding all other function components and HTML JSX
returns heading title "Todo List", AddTodoForm component, and conditional react to display "Loading..." or TodoList component.
*/
function App() {

  /*
  Call and destructure React.useState hook to set todoList variable with value defined by setTodoList function.
  Call and destructure React.useState hook to set isLoading variable with value defined by setIsLoading function.
  */
  const [todoList, setTodoList] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  /*
  React.useEffect provides a side effect to be ran based on dependancy.
  If a change occurs in TodoList and isLoading is false this code is implemented which stores the TodoList in localStorage
  */
  React.useEffect(() => {
    if(!isLoading){
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  /*
  React.useEffect provides a side effect to be ran based on dependancy.
  Empty dependency array triggers code on initial render
``Fetch data from Airtable API that updates todoList with returned data and sets isLoading to false.
  */
  React.useEffect(() => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }
    })
    .then((response) => response.json())
    .then((result) => {
      setTodoList(result.records);
      setIsLoading(false);
    });
  }, []);

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
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <React.Fragment>
            <h1>Todo List</h1>
            {/*onAddTodo property of AddTodoForm component works as a callback handler to define newTodo in addTodo function based on user input within AddTodoForm input feild.*/}
            <AddTodoForm onAddTodo={addTodo}/>
            {/*
            Conditional react returns paragraph tags while isLoading is true, if false return TodoList component.
            onRemoveTodo property of TodoList component works as a callback handler to pass id argument in removeTodo function based on a pre-defined TodoListItem's id.
            Property passed down to TodoList.js and once more to TodoListItem.js
            */}
            {
            isLoading ? <p>Loading ...</p> :
            <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
            }
          </React.Fragment>
        }/>
        <Route path="/new" element={<h1>New Todo List</h1>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
