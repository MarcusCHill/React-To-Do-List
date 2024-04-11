import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import style from "./App.module.css";
import { ReactComponent as Loading } from './svgs/loading.svg';
import { ReactComponent as Home } from './svgs/home.svg';
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

/*
Create main function component App that returns a container holding all other function components and HTML JSX
returns navigation, TodoList component, AddTodoForm component, and conditional react to display "Loading..." or TodoList component.
four browser routes being "/", "/Personal", "/School", and "/Work" to load home page and three different todo lists
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
  Call and destructure React.useState hook with passed initial value of [] to set todoList variable with value defined by setTodoList function.
  Call and destructure React.useState hook with passed initial value of true to set isLoading variable with value defined by setIsLoading function.
  Call and destructure React.useState hook with passed initial value of (current time as string) to set currentTime variable with value defined by setCurrentTime function.
  Call and destructure React.useState hook with passed initial value of (current hour of 24 hour time as number) to set currentHour variable with value defined by setCurrentHour function.
  Call and destructure React.useState hook with passed initial value of "" to set greeting variable with value defined by setGreeting function.
  */
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [currentHour, setCurrentHour] = React.useState(new Date().getHours());
  const [greeting, setGreeting] = React.useState("");

  /*
  updateTime function updates currentHour with the hour in 24 hour time as a nummber through setCurrentHour setter function.
  updateTime function updates currentTime with the local time represented as a (two digit hour):(two digit minute) AM/PM as a string.
  setInterval is used to call updateTime function every 1000ms
  */
  const updateTime = () => {
    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setCurrentHour(new Date().getHours())
    setCurrentTime(time);
  }

  setInterval(updateTime, 1000);

  /*
  React.useEffect calls anonomyous function.
  currentHour in dependency array of useEffect riggers code on currentHour change.
  conditional within function will set the class on body element and update greeting through setGreeting function based on the currentHour/time of day.
  */
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
  isLoading and fetchListType in dependency array of handleFetchTodoItems triggers code on isLoading change.
  if isLoading is false or fetchListType is and empty string ("") exit function
  fetchListType is used to define fetch URL.
  Fetch GET request data from Airtable API that updates todoList with returned data as it appears in Airtable and sets isLoading to false.
  */
  const handleFetchTodoItems = React.useCallback(() => {
    if (!isLoading || fetchListType === "") return;
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${fetchListType}/?view=Grid%20view`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_TOKEN}`
      }
    })
    .then((response) => response.json())
    .then((result) => {
      setTodoList(result.records);
      setIsLoading(false);
    });
  }, [isLoading, fetchListType]);

  React.useEffect(() =>{
    handleFetchTodoItems();
  }, [handleFetchTodoItems])

  /*
  addTodo function accepts newTodo and position parameters
  calls fetch POST request to add newTodo and position fields to API and sets setIsLoading to true to trigger useCallback.
  fetchListType is used to define fetch uRL
  */
  function addTodo (newTodo, position){
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${fetchListType}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_TOKEN}`,
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
  fetchListType and id is used to define fetch uRL
  */
  function removeTodo (id){
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${fetchListType}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_TOKEN}`,
      },
    })
    .then((response) => response.json())
    .then((result) => {
      setIsLoading(true);
    });
  };

  /*
  handleOnDragEnd function accepts event values in respose to onDragEnd event
  if event destination is not defined exit function
  array of objects (updateAirtableInfo) is passed into PUT request is generated based on dragged items start and end location
  calls fetch PUT request to update position field at corresponding id in API and sets setIsLoading to true to trigger useCallback.
  fetchListType and id is used to define fetch uRL
  */
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
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_TOKEN}`,
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
            {/*onAddTodo property of AddTodoForm component works as a callback handler to define newTodo and position in addTodo function based on user input and todoList length within AddTodoForm input feild.*/}
            <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
            {/*
            Conditional react returns Loading svg component while isLoading is true, if false return TodoList component.
            onRemoveTodo property works as a callback handler to pass id argument in removeTodo function based on a pre-defined TodoListItem's id.
            onDragEnd property works as a callback handler to pass event argument in handleOnDragEnd function based on dragged item's event completions
            Property passed down to TodoList.js and once more to TodoListItem.js
            */}
            {isLoading ? <Loading className={style.loading}/> :
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} onDragEnd={handleOnDragEnd}/>}
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
            <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
            {isLoading ? <Loading className={style.loading}/> :
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} onDragEnd={handleOnDragEnd}/>}
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
            <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
            {isLoading ? <Loading className={style.loading}/> :
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} onDragEnd={handleOnDragEnd}/>}
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
