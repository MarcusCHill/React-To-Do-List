import * as React from "react";
import PropTypes from 'prop-types';
import style from "./TodoListItem.module.css"

TodoListItem.propTypes = {
  todoList: PropTypes.string,
  onRemoveTodo: PropTypes.func,
  provided: PropTypes.object,
}

/*
Create TodoListItem function component that accepts properties defined at TodoListItem instantization
Returns a list element with the item's title value and creates a remove button that acceses onRemoveTodo property.
*/
function TodoListItem ({ item, onRemoveTodo, provided, innerRef}){
  return(
    <li className={style.listItem} {...provided.dragHandleProps} {...provided.draggableProps} ref={innerRef}>
      {item.fields.Title}
      &nbsp;
      <button type="button" onClick={() => onRemoveTodo(item.id)} className={style.button}>Remove</button>
    </li>
  );
};

export default TodoListItem;
