import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList () {

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
  ];

  return (
    <ul>
      {todoList.map(function(item){
        return <TodoListItem key={item.id} item={item}/>
      })}
    </ul>
  );
};

export default TodoList;
