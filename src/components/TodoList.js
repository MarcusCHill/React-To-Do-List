import React from "react";
import PropTypes from 'prop-types';
import TodoListItem from "./TodoListItem";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
}


/*
Create TodoList function component that returns an unordered list where list items are accessed by todoList array using map method
*/
function TodoList ({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {/*
      Iterate over todoList array using map method that accepts a function returning TodoListItem function component with properties to pass down
      key property is set as "item.id" accessing the id value within each value of todoList array
      item propery is set as "item" accessing each value within todoList array
      */}
      {todoList.map(function(item){
        return <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo}/>
      })}
    </ul>
  );
};

export default TodoList;
