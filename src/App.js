import React from 'react';

const todoList = [
  {
    title: "Complete Assignment 1.1",
    id: 0
  },
  {
    title: "Attend at least 2 mentor session this week",
    id: 1
  },
  {
    title: "Complete your daily workout",
    id: 2
  }
]

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function(item){
          return <li key = {item.id}>{item.title}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
