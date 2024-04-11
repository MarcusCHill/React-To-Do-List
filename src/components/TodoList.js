import React from "react";
import PropTypes from 'prop-types';
import style from "./TodoList.module.css";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import TodoListItem from "./TodoListItem";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onDragEnd: PropTypes.func,
}

/*
Create TodoList function component that returns an unordered list where list items are accessed by todoList array using map method
all list items are Draggable within the Droppable container to rearrange its position variable by send event information to handleOnDragEnd through onDragEnd event
*/
function TodoList ({ todoList, onRemoveTodo, onDragEnd}){

  /*
  if there are no items in todoList add className .emptyList to ul element to set display to none.
  */
  let todoListStyles = [style.listTodos]
  if(todoList.length < 1){
    todoListStyles.push(style.emptyList)
  } else {
    todoListStyles.filter((style) => style !== style.emptyList)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todoList">
      {(provided) => (
        <ul id="todoList" className={todoListStyles} {...provided.droppableProps} ref={provided.innerRef}>
          {/*
          Iterate over todoList array using map method that accepts a function returning TodoListItem function component with properties to pass down
          key property is set as "item.id" accessing the id value within each value of todoList array
          item propery is set as "item" accessing each value within todoList array
          */}
          {todoList.map(function(item, index){
            return (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo} provided={provided} innerRef={provided.innerRef} />
                )}
              </Draggable>
            )}
          )}
          {provided.placeholder}
        </ul>
      )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
