import React from "react";

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

function TodoList () {
  return (
    <ul>
      {todoList.map(function(item){
        return <li key = {item.id}>{item.title}</li>
      })}
    </ul>
  );
}

export default TodoList;
