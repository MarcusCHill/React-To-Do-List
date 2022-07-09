import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import style from "./App.module.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

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
  React.useEffect calls handleFetchTodoItems anytime it is called/changed.
  isLoading in dependency array of handleFetchTodoItems triggers code on isLoading change.
  Fetch GET data from Airtable API that updates todoList with returned data and sets isLoading to false.
  */
  const handleFetchTodoItems = React.useCallback(() => {
    if (!isLoading) return;

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
  }, [isLoading]);

  React.useEffect(() =>{
    handleFetchTodoItems();
  }, [handleFetchTodoItems])

  /*
  addTodo function accepts newTodo parameter
  calls fetch POST request to add newTodo to API and sets setIsLoading to true to trigger useCallback.
  */
  function addTodo (newTodo){
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
      {
        "fields": {
          "Title": newTodo
        }
      })
    })
    .then((response) => response.json())
    .then((result) => {
      setIsLoading(true);
    });
  }

  /*
  removeTodo function accepts id parameter
  calls fetch DELETE request to remove TodoListItem with corresponding id in API and sets setIsLoading to true to trigger useCallback.
  */
  function removeTodo (id){
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
    .then((response) => response.json())
    .then((result) => {
      setIsLoading(true);
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <React.Fragment>
            <h1 className={style.title}>Todo List</h1>
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
