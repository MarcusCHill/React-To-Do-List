import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import style from "./App.module.css";
import { ReactComponent as Loading } from './svgs/loading.svg';
import { ReactComponent as Home } from './svgs/home.svg';
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

/*
Create main function component App that returns a container holding all other function components and HTML JSX
returns heading title "Todo List", AddTodoForm component, and conditional react to display "Loading..." or TodoList component.
*/
function App() {
  /*
  Define the path location.
  Pathname is used to define fetchListType
  fetchListType will be passed in each API call
  */
  let pathname = window.location.pathname;
  let fetchListType = pathname.substring(1);

  /*
  Call and destructure React.useState hook to set todoList variable with value defined by setTodoList function.
  Call and destructure React.useState hook to set isLoading variable with value defined by setIsLoading function.
  Call and destructure React.useState hook to set currentTime variable with value defined by setCurrentTime function.
  Call and destructure React.useState hook to set currentHour variable with value defined by setCurrentHour function.
  */
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [currentHour, setCurrentHour] = React.useState(new Date().getHours());

  const updateTime = () => {
    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setCurrentHour(new Date().getHours())
    setCurrentTime(time);
  }
  setInterval(updateTime, 1000);

  const [greeting, setGreeting] = React.useState("");
  React.useEffect(()=>{
    if (currentHour >= 6 && currentHour < 12){
      document.body.classList = 'morning'
      setGreeting("GOOD MORNING")
    } else if (currentHour >= 12 && currentHour < 17){
      document.body.classList = 'afternoon'
      setGreeting("GOOD AFTERNOON")
    } else if (currentHour >= 17 && currentHour < 22) {
      document.body.classList = 'evening'
      setGreeting("GOOD EVENING")
    } else {
      document.body.classList = 'night'
      setGreeting("GOOD EVENING")
    }
  },[currentHour])

  /*
  React.useEffect calls handleFetchTodoItems anytime it is called/changed.
  isLoading in dependency array of handleFetchTodoItems triggers code on isLoading change.
  Fetch GET data from Airtable API that updates todoList with returned data and sets isLoading to false.
  */
  const handleFetchTodoItems = React.useCallback(() => {
    if (!isLoading || fetchListType === "") return;
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${fetchListType}/?view=Grid%20view`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }
    })
    .then((response) => response.json())
    .then((result) => {
      setTodoList(result.records)
      setIsLoading(false);
    });
  }, [isLoading, fetchListType]);

  React.useEffect(() =>{
    handleFetchTodoItems();
  }, [handleFetchTodoItems])

  /*
  addTodo function accepts newTodo parameter
  calls fetch POST request to add newTodo to API and sets setIsLoading to true to trigger useCallback.
  */
  function addTodo (newTodo, position){
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${fetchListType}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
      {
        "fields": {
          "Title": newTodo,
          "Position": position,
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
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${fetchListType}/${id}`, {
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

  function handleOnDragEnd(e){
    if (!e.destination) return;
    let start = e.source.index;
    let end = e.destination.index;
    const reorderedTodoList = Array.from(todoList);
    const [reorderedListItem] = reorderedTodoList.splice(start, 1);
    reorderedTodoList.splice(end, 0, reorderedListItem);
    let updateAirtableInfo = [];
    let i = 0;
    if (start > end){
      i = end;
      end = start;
    } else {
      i = start;
    }
    while (i <= end){
      let reorderedItemId = reorderedTodoList[i].id
      let reorderedItemTitle = reorderedTodoList[i].fields.Title
      let patchItemPosition = i
      function records() {
        return({
          id: reorderedItemId,
          fields: {
            Title: reorderedItemTitle,
            Position: patchItemPosition,
          }
        })
      }
      updateAirtableInfo.push(records());
      i++
    }
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${fetchListType}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "records": updateAirtableInfo,
      })
    })
    .then((response) => response.json())
    .then((result) => {
      setIsLoading(true);
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <div className={style.appContainer}>
            <nav className={style.navHome}>
              <ul className={style.navHomeListContainer}>
                <li><a href="/Personal">Personal</a></li>
                <li><a href="/School">School</a></li>
                <li><a href="/Work">Work</a></li>
              </ul>
            </nav>
            <div className={style.timeContainer}>
              <p>{greeting}</p>
              <p>{currentTime}</p>
            </div>
          </div>
        }/>
        <Route exact path="/School" element={
          <div className={style.appContainer}>
            <nav className={style.nav}>
              <ul className={style.home}>
                <li><a href="/"><Home/></a></li>
              </ul>
              <ul className={style.navListContainer}>
                <li><a href="/Personal">Personal</a></li>
                <li><a href="/Work">Work</a></li>
              </ul>
            </nav>
            <h1 className={style.listTitle}>School Todo List</h1>
            {/*onAddTodo property of AddTodoForm component works as a callback handler to define newTodo in addTodo function based on user input within AddTodoForm input feild.*/}
            <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
            {/*
            Conditional react returns paragraph tags while isLoading is true, if false return TodoList component.
            onRemoveTodo property of TodoList component works as a callback handler to pass id argument in removeTodo function based on a pre-defined TodoListItem's id.
            Property passed down to TodoList.js and once more to TodoListItem.js
            */}
            {
            isLoading ? <Loading className={style.loading}/> :
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} onDragEnd={handleOnDragEnd}/>
            }
          </div>
        }/>
        <Route path="/work" element={
          <div className={style.appContainer}>
            <nav className={style.nav}>
              <ul className={style.home}>
                <li><a href="/"><Home/></a></li>
              </ul>
              <ul className={style.navListContainer}>
                <li><a href="/Personal">Personal</a></li>
                <li><a href="/School">School</a></li>
              </ul>
            </nav>
            <h1 className={style.listTitle}>Work Todo List</h1>
            {/*onAddTodo property of AddTodoForm component works as a callback handler to define newTodo in addTodo function based on user input within AddTodoForm input feild.*/}
            <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
            {/*
            Conditional react returns paragraph tags while isLoading is true, if false return TodoList component.
            onRemoveTodo property of TodoList component works as a callback handler to pass id argument in removeTodo function based on a pre-defined TodoListItem's id.
            Property passed down to TodoList.js and once more to TodoListItem.js
            */}
            {
            isLoading ? <Loading className={style.loading}/> :
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} onDragEnd={handleOnDragEnd}/>
            }
          </div>
        }/>
        <Route exact path="/Personal" element={
          <div className={style.appContainer}>
            <nav className={style.nav}>
              <ul className={style.home}>
                <li><a href="/"><Home/></a></li>
              </ul>
              <ul className={style.navListContainer}>
                <li><a href="/School">School</a></li>
                <li><a href="/Work">Work</a></li>
              </ul>
            </nav>
            <h1 className={style.listTitle}>Personal Todo List</h1>
            {/*onAddTodo property of AddTodoForm component works as a callback handler to define newTodo in addTodo function based on user input within AddTodoForm input feild.*/}
            <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
            {/*
            Conditional react returns paragraph tags while isLoading is true, if false return TodoList component.
            onRemoveTodo property of TodoList component works as a callback handler to pass id argument in removeTodo function based on a pre-defined TodoListItem's id.
            Property passed down to TodoList.js and once more to TodoListItem.js
            */}
            {
            isLoading ? <Loading className={style.loading}/> :
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} onDragEnd={handleOnDragEnd}/>
            }
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
